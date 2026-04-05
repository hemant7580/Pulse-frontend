import axios from 'axios';

export const API_BASE = "https://pulse-frontend-271v.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mini_social_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function mediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}

export async function signup(payload) {
  const { data } = await api.post('/api/auth/signup', payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post('/api/auth/login', payload);
  return data;
}

export async function fetchPosts() {
  const { data } = await api.get('/api/posts');
  return data;
}

export async function createPost(formData) {
  const { data } = await api.post('/api/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function toggleLike(postId) {
  const { data } = await api.put(`/api/posts/${postId}/like`);
  return data;
}

export async function addComment(postId, text) {
  const { data } = await api.post(`/api/posts/${postId}/comment`, { text });
  return data;
}

export default api;
