import axios from 'axios';
import { BASE_URL } from '../config/config.jsx';

let csrfPromise = null;

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    if (!csrfPromise) {
      csrfPromise = axios
        .get(`${BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true })
        .finally(() => (csrfPromise = null));
    }
    await csrfPromise;

    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    if (match) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[1]);
    }
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
