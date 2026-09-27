import axios from 'axios';

export const TOKEN_KEY = 'hornaai_token';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable (private mode) — session still works until reload */
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Normalises axios errors into { message, fields, status }. */
export function parseError(err) {
  const status = err?.response?.status;
  const data = err?.response?.data;
  if (!err?.response) {
    return { status: 0, message: 'Cannot reach the server. Check your connection and try again.', fields: {} };
  }
  return { status, message: data?.message || 'Something went wrong. Please try again.', fields: data?.details || {} };
}
