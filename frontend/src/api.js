const API_ENDPOINT = "http://localhost:4001";
// "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: (keyword) => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then((res) =>
      res.json()
    );
  },
  fetchRandomCats: (keyword) => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`).then((res) => res.json());
  },
};
