import config from './config.js';

const { API_ENDPOINT } = config;

const REQUEST_ERROR = {
  '500': { msg: '요청실패', alert: true },
  '400': { msg: 'ddd' }
}

const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    catAlert(error.msg);
    return { data: null }
  }
}

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsWithLimit: (keyword, limit) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limit}`);
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: id => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;