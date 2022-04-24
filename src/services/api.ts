import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BACKEND_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
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
      'X-API-KEY': '61bb7a97-7cb8-418b-a9e0-a9c0a84911b8',
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
