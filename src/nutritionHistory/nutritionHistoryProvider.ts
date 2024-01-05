/* eslint-disable no-empty-pattern */
// in src/dataProvider.ts
import { fetchUtils } from 'react-admin';
import { addRefreshAuthToDataProvider } from 'react-admin';
import { refreshAuth } from '../auth/refreshAuth';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/bmi';
const httpClient = fetchUtils.fetchJson;

let nutritionHistoryDataProvider = {
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
      .then(({ json }) => ({ data: json.data }));
  },
  getManyReference: ({}, params: any) => {
    const url = `${apiUrl}/children/${params.id}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    return httpClient(url, {
      method: 'GET',
      headers,
    })
      .then(({ json }) => ({
        data: json.data.nutrition_histories,
        total: 100,
      }));
  },
  update: ({}, params: any) => {
    const url = `${apiUrl}/${params.id}`;
    const accessToken = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': `Bearer ${accessToken}`,
    });

    const data: {} = {
      age_in_month: params.data.age_in_month.toString(),
      height: params.data.height.toString(),
      weight: params.data.weight.toString(),
    }

    return httpClient(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers,
      })
      .then(({ json }) => ({ data: {
        id: params.id,
        ...json.data,
      }}));
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

export default nutritionHistoryDataProvider = addRefreshAuthToDataProvider(nutritionHistoryDataProvider as any, refreshAuth);