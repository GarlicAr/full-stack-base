import apiClient from '../utils/apiClient.jsx';

export default function fetchCategories() {
  return apiClient.get('/categories').then((r) => r);
}
