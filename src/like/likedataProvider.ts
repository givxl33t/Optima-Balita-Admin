/* eslint-disable no-empty-pattern */
// in src/dataProvider.ts
import { fetchUtils } from 'react-admin';
import { addRefreshAuthToDataProvider } from 'react-admin';
import { refreshAuth } from '../auth/refreshAuth';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/forum';
const httpClient = fetchUtils.fetchJson;

let likeDataProvider = {
  getManyReference: ({}, params: any) => {
    const url = `${apiUrl}/${params.id}/like`;
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
        total: 100,
      }));
  },
};

export default likeDataProvider = addRefreshAuthToDataProvider(likeDataProvider as any, refreshAuth);