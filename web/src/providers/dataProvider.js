import { fetchUtils } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

const mapId = (item) => ({ ...item, id: item.id ?? item._id });

const getTotal = (headers, json) => {
  const total = parseInt(headers.get('x-total-count'), 10);
  return Number.isNaN(total) ? json.length : total;
};

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      ...params.filter,
    };

    const url = `${API_URL}/${resource}?${new URLSearchParams(query)}`;
    const { headers, json } = await httpClient(url);

    return {
      data: json.map(mapId),
      total: getTotal(headers, json),
    };
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: mapId(json) };
  },

  getMany: async (resource, params) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    const url = `${API_URL}/${resource}?${new URLSearchParams(query)}`;
    const { json } = await httpClient(url);
    return { data: json.map(mapId) };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      [params.target]: params.id,
      ...params.filter,
    };

    const url = `${API_URL}/${resource}?${new URLSearchParams(query)}`;
    const { headers, json } = await httpClient(url);

    return {
      data: json.map(mapId),
      total: getTotal(headers, json),
    };
  },

  create: async (resource, params) => {
    const url = `${API_URL}/${resource}`;
    const { json } = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: mapId(json) };
  },

  update: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: mapId(json) };
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(id =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    );
    return { data: responses.map(({ json }) => json.id ?? json._id) };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    await httpClient(url, { method: 'DELETE' });
    return { data: { id: params.id } };
  },

  deleteMany: async (resource, params) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    const url = `${API_URL}/${resource}?${new URLSearchParams(query)}`;
    await httpClient(url, { method: 'DELETE' });
    return { data: params.ids };
  },
};
