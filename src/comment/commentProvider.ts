/* eslint-disable no-empty-pattern */
// in src/dataProvider.ts
import { fetchUtils } from 'react-admin';
import { addRefreshAuthToDataProvider } from 'react-admin';
import { refreshAuth } from '../auth/refreshAuth';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/forum';
const httpClient = fetchUtils.fetchJson;

let commentDataProvider = {
  getOne: ({}, params: any) => {
    const url = `${apiUrl}/comment/${params.id}`;
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
  getManyReference: ({}, params: any) => {
    const { page, perPage } = params.pagination;

    const url = `${apiUrl}/${params.id}/comment/?limit=${perPage}&page=${page}`;
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
  create: ({}, params: any) => {
    const url = `${apiUrl}/${params.data.discussion_id}/comment`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    const data: {} = {
      comment_content: params.data.comment_content,
    }

    return httpClient(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      })
      .then(({ json }) => ({ data: {
        id: json.data.id,
        ...json.data,
      } }));
  },
  update: ({}, params: any) => {
    const url = `${apiUrl}/comment/${params.id}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    const data: {} = {
      comment_content: params.data.comment_content,
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
    const url = `${apiUrl}/comment/${params.id}`;
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
    
    const deletePromises = params.ids.map((id: any) => httpClient(`${apiUrl}/comment/${id}`, {
      method: 'DELETE',
      headers,
    }));

    return Promise.all(deletePromises)
      .then(() => {
        return Promise.resolve({ data: params.ids })
      })
      .catch((error) => {
        return Promise.reject(error)
      });
  }
};

export default commentDataProvider = addRefreshAuthToDataProvider(commentDataProvider as any, refreshAuth);