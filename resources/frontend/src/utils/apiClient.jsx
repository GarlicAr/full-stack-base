import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  headers: {
    'Content-Type': 'application/json',
  },
});

let csrfPromise = null;
apiClient.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    if (!csrfPromise) {
      csrfPromise = axios
        .get(`${BASE_URL}/sanctum/csrf-cookie`, {
          withCredentials: true,
        })
        .finally(() => {
          csrfPromise = null;
        });
    }
    await csrfPromise;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default apiClient;
