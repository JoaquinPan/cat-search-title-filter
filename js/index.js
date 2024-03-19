import { fetchCats, fetchBreeds } from "./api.js";
import {
  renderCats,
  addCloseDropdownListener,
  addDropDownListener,
  renderOptions,
  clearImages,
  addSelectOrderListener,
  addLoadMoreButtonListener,
  enableLoadMoreButton,
  disableLoadMoreButton,
  addCloseDrawerListner,
} from "./dom.js";

const pageSize = 12;
let order = "DESC";
let page = 1;
let selectedOptions = [];
const catList = [];

async function loadCats(limit, page, order, breedIds = []) {
  // 從api抓貓的資料
  const list = await fetchCats(limit, page, order, breedIds);
  catList.push(...list);

  renderCats(list);
  if (list.length < limit) {
    // no more cats
    disableLoadMoreButton();
    return false;
  }

  return true;
}

async function handleBreedOptionChange(e) {
  const changedOption = e.target;
  if (changedOption.checked) {
    selectedOptions.push(changedOption.value);
  } else {
    selectedOptions = selectedOptions.filter(
      (item) => item !== changedOption.value
    );
  }
  clearImages();
  enableLoadMoreButton();
  page = 1;
  const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
  if (hasNextPage) {
    page++;
  }
}

async function loadBreedOptions() {
  const breeds = await fetchBreeds();
  renderOptions(breeds, handleBreedOptionChange);
}

function addListeners() {
  addDropDownListener();
  addCloseDropdownListener();
  addCloseDrawerListner();
  addSelectOrderListener(async (e) => {
    order = e.target.value;
    clearImages();
    enableLoadMoreButton();
    page = 1;
    const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
    if (hasNextPage) {
      page++;
    }
  });

  addLoadMoreButtonListener(async () => {
    const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
    if (hasNextPage) {
      page++;
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  loadBreedOptions();
  const hasNextPage = await loadCats(pageSize, page, order, selectedOptions);
  if (hasNextPage) {
    page++;
  }
  addListeners();
});
