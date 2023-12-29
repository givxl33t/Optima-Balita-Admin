import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/auth';

export const refreshAuth = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const decoded = jwtDecode(accessToken as string);
    const now = Date.now().valueOf() / 1000;
    if (decoded && decoded.exp && decoded.exp - 10 < now) {
        const request = new Request(`${apiUrl}/refresh`, {
            method: 'PUT',
            body: JSON.stringify({ refreshToken }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request)
            .then(response => {
                if (response.status > 400) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ accessToken, refreshToken }) => {
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
            }).catch(() => {
                throw new Error('Network error')
            });
    }
    return Promise.resolve();
}