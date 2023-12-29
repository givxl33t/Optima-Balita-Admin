// in src/authProvider.ts
import { AuthProvider } from "react-admin";
import { addRefreshAuthToAuthProvider } from "react-admin";
import { refreshAuth } from "./refreshAuth";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/auth';

const myAuthProvider: AuthProvider = {
    login: ({ username, password }) => {
        const request = new Request(`${apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
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
    },
    checkAuth: () => 
        localStorage.getItem('access_token') 
            ? Promise.resolve() 
            : Promise.reject(),
    logout: () => {
        const request = new Request(`${apiUrl}/logout`, {
            method: 'DELETE',
            body: JSON.stringify({refreshToken: localStorage.getItem('refresh_token')}),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request)
            .then(response => {
                if (response.status > 400) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return Promise.resolve();
            }).catch(() => {
                throw new Error('Network error')
            });
    
    },
    checkError: ({ status }) => {
        if (status === 401) {
            return Promise.reject();
        }
        return Promise.resolve(
            localStorage.getItem('access_token') 
                ? Promise.resolve() 
                : Promise.reject()
        );
    },
    getPermissions: () => Promise.resolve(),
};

export const authProvider = addRefreshAuthToAuthProvider(myAuthProvider, refreshAuth);