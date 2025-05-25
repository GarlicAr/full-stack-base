import apiClient from '../utils/apiClient';

export function fetchPosts() {
  return apiClient.get('/posts').then((r) => r);
}

export function fetchPostWithComments(post_id) {
  return apiClient.get(`/posts/${post_id}`).then((r) => r);
}
