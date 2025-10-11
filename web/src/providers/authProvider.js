const API_URL = 'http://localhost:8000/api';

export const authProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
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
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return Promise.resolve({
        id: user.id,
        fullName: user.username,
        avatar: user.avatar,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getPermissions: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return Promise.resolve(user?.role || 'user');
  },
};
