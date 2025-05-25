import apiClient from '../utils/apiClient';

export function fetchPosts() {
  return apiClient.get('/posts').then((r) => r);
}
