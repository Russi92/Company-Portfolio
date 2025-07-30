

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://theway4business.27lashabab.com/api',
});

// أضف Interceptor لإرسال التوكن تلقائيًا مع كل طلب
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

