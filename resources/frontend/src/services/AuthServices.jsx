import apiClient from '../utils/apiClient';

export function register(payload) {
  return apiClient.post('register', payload).then((r) => r.data);
}

export function login(payload) {
  return apiClient.post('login', payload).then((r) => r.data);
}
