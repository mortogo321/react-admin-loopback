export const Config = {
  app: {
    name: 'React Demo'
  },
  server: {
    dev: 'http://localhost:3000/api',
    prod: 'https://example.com/api'
  },
  api() {
    return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? this.server.dev : this.server.prod;
  }
};

export * from './menu';
export * from './routes';