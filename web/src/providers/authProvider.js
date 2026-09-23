const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export const authProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    let response;
    try {
      response = await fetch(request);
    } catch {
      throw new Error('Cannot reach the API. Is the backend running?');
    }
    if (response.status < 200 || response.status >= 300) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || response.statusText || 'Login failed');
    }

    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const user = readUser();
    if (!user) return Promise.reject(new Error('No identity'));
    return Promise.resolve({
      id: user.id,
      fullName: user.username,
      avatar: user.avatar,
    });
  },

  getPermissions: () => {
    const user = readUser();
    return Promise.resolve(user?.role || 'user');
  },
};
