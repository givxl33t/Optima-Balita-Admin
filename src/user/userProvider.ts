/* eslint-disable no-empty-pattern */
// in src/dataProvider.ts
import { fetchUtils } from 'react-admin';
import { addRefreshAuthToDataProvider } from 'react-admin';
import { refreshAuth } from '../auth/refreshAuth';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/user';
const httpClient = fetchUtils.fetchJson;

let userDataProvider = {
  getList: ({}, params: any) => {
    const { page, perPage } = params.pagination;
    const { filter } = params;

    let q = '';
    if (filter.q) {
      q = `${filter.q}`;
    }

    const url = `${apiUrl}/?limit=${perPage}&page=${page}&filter=${q}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    return httpClient(url, {
      method: 'GET',
      headers,
    })
      .then(({ json }) => ({
        data: json.data,
        total: json.meta.total_data,
      }));
  },
  getMany: ({}) => {
    const url = `${apiUrl}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    return httpClient(url, {
      method: 'GET',
      headers,
    })
      .then(({ json }) => ({
        data: json.data,
      }));
  },
  getOne: ({}, params: any) => {
    const url = `${apiUrl}/${params.id}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    return httpClient(url, {
      method: 'GET',
      headers,
    })
      .then(({ json }) => ({
        data: json.data,
      }));
  },
  update: ({}, params: any) => {
    const url = `${apiUrl}/${params.id}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    let data: {} = {
      email: params.data.email,
      username: params.data.username,
    }

    if (params.data.role_id) {
      data = {
        ...data,
        role_id: params.data.role_id,
      }
    }

    return httpClient(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers,
      })
      .then(({ json }) => ({ data: {
        id: params.id,
        ...json.data,
      
      } }));
  },
  delete: ({}, params: any) => {
    const url = `${apiUrl}/${params.id}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    return httpClient(url, {
        method: 'DELETE',
        headers,
      })
      .then(({ json }) => ({ data: json.data }));
  },
  deleteMany: ({}, params: any) => {
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });
    
    const deletePromises = params.ids.map((id: any) => httpClient(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers,
    }));

    return Promise.all(deletePromises)
      .then(() => {
        return Promise.resolve({ data: params.ids})
      })
      .catch((error) => {
        return Promise.reject(error)
      });
  }
};

export default userDataProvider = addRefreshAuthToDataProvider(userDataProvider as any, refreshAuth);