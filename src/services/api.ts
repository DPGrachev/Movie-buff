import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REQUEST_TIMEOUT = 5000;

enum HttpCode {
  MaxRequestLimit = 402,
  NotFound = 404,
}

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'X-API-KEY': '01fc2e74-3c86-48ff-9760-06fd760e77bd',
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === HttpCode.MaxRequestLimit) {
        console.log('Превышен лимит запросов, повторите позже');
      }
      if (response?.status === HttpCode.NotFound) {
        console.log('Страница не найдена');
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export { createAPI };
