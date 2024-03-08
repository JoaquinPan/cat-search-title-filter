const apiKey =
  "live_3HqBDPbrUAnjYEKTvXfSAKclOZwhqRvXdUY5WTclPF4Cu8oxfPk3ppL1V6PiG7jf";

export function fetchCats(limit, page, order, breedIds = []) {
  const url = new URL("https://api.thecatapi.com/v1/images/search");
  url.searchParams.append("limit", limit);
  url.searchParams.append("has_breeds", 1);
  url.searchParams.append("order", order);
  url.searchParams.append("page", page);
  url.searchParams.append("api_key", apiKey);

  if (breedIds.length > 0) {
    url.searchParams.append("breed_ids", breedIds.join(","));
  }

  return fetch(url).then((res) => res.json());
}
