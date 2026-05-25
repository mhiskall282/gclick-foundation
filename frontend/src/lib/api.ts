export const getApiUrl = (path: string) => {
  const baseUrl = import.meta.env.VITE_API_URL || '';
  const sanitizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${sanitizedBase}${sanitizedPath}`;
};

export const fetchApi = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Handle json payload automatically if not multipart/form-data
  if (options.body && typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(getApiUrl(path), {
    ...options,
    headers
  });
};
