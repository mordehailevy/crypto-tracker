import axios from 'axios';

const apiClient = axios.create({
  timeout: 15_000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      axios.isAxiosError(error) && error.response
        ? `API Error ${error.response.status}: ${error.response.statusText}`
        : error instanceof Error
          ? error.message
          : 'Unknown error';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
