/* eslint-disable no-empty-pattern */
// in src/dataProvider.ts
import { fetchUtils } from 'react-admin';
import { addRefreshAuthToDataProvider } from 'react-admin';
import { refreshAuth } from '../auth/refreshAuth';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/bmi/children';
const httpClient = fetchUtils.fetchJson;

let childrenDataProvider = {
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
};

export default childrenDataProvider = addRefreshAuthToDataProvider(childrenDataProvider as any, refreshAuth);