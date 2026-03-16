import axios from 'axios';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const isMissingApiIndex = rawBaseUrl.endsWith('/api') ? false : true;

const api = axios.create({
  baseURL: isMissingApiIndex ? `${rawBaseUrl}/api` : rawBaseUrl,
});

api.interceptors.request.use((config) => {
  const adminStorage = localStorage.getItem('semtagi-admin-storage');
  if (adminStorage) {
    const { state } = JSON.parse(adminStorage);
    if (state.token) {
      config.headers.Authorization = `Bearer ${state.token}`;
    }
  }
  return config;
});

export default api;
