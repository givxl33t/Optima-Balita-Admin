/* eslint-disable no-empty-pattern */
// in src/dataProvider.ts
import { fetchUtils } from 'react-admin';
import { addRefreshAuthToDataProvider } from 'react-admin';
import { refreshAuth } from '../auth/refreshAuth';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/article';
const httpClient = fetchUtils.fetchJson;

let articleDataProvider = {
  getList: ({}, params: any) => {
    const { page, perPage } = params.pagination;

    const url = `${apiUrl}/?limit=${perPage}&page=${page}`;

    return httpClient(url)
      .then(({ json }) => ({
        data: json.data,
        total: json.meta.total_data,
      }));
  },
  getOne: ({}, params: any) =>
    httpClient(`${apiUrl}/${params.id}`).then(({ json }) => ({
      data: json.data,
    })),
  create: ({}, params: any) => {
    const url = `${apiUrl}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    const formData = new FormData();
    formData.append('title', params.data.title);
    formData.append('description', params.data.description);
    formData.append('content', params.data.content);
    if (params.data.image) {
      formData.append('image', params.data.image.rawFile);
    }


    return httpClient(url, {
        method: 'POST',
        body: formData,
        headers,
      })
      .then(({ json }) => ({ data: {
        id: json.data.id,
        ...json.data,
      } }));
  },
  update: ({}, params: any) => {
    const url = `${apiUrl}/${params.id}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    const formData = new FormData();
    formData.append('title', params.data.title);
    formData.append('description', params.data.description);
    formData.append('content', params.data.content);
    if (params.data.image.rawFile) {
      formData.append('image', params.data.image.rawFile);
    }

    return httpClient(url, {
        method: 'PUT',
        body: formData,
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
  }
};

export default articleDataProvider = addRefreshAuthToDataProvider(articleDataProvider as any, refreshAuth);