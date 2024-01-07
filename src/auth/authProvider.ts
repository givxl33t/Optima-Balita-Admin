// in src/authProvider.ts
import { AuthProvider } from "react-admin";
import { addRefreshAuthToAuthProvider } from "react-admin";
import { refreshAuth } from "./refreshAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL + '/auth';

const ADMIN_ID = 'a1582ba5-d764-4a15-b181-657e8753869b';
const DOCTOR_ID = '9c4e9a57-12da-4dae-b2e0-edec77c4f86e';

interface CustomJwtPayload extends JwtPayload {
    user_id: string;
    role_id: string;
}

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

                const decodedToken: CustomJwtPayload = jwtDecode(accessToken);

                if (decodedToken.role_id !== ADMIN_ID && decodedToken.role_id !== DOCTOR_ID) {
                    throw new Error('Invalid role');
                }

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
            }).catch((error) => {
                if (error.message === 'Invalid role') {
                    // Provide a user-friendly error message
                    throw new Error('You do not have admin rights');
                }
                throw new Error('Network error')
            });
    },
    checkAuth: () => 
        localStorage.getItem('access_token') 
            ? Promise.resolve() 
            : Promise.reject(),
    logout: () => {
        if (!localStorage.getItem('refresh_token')) {
            return Promise.resolve();
        }

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
    getPermissions: () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return Promise.reject();
        }
        const decodedToken: CustomJwtPayload = jwtDecode(token);

        if (decodedToken.role_id === ADMIN_ID) {
            return Promise.resolve('admin');
        }

        if (decodedToken.role_id === DOCTOR_ID) {
            return Promise.resolve('doctor');
        }

        return Promise.reject();
    },
    getIdentity: () => {
        const request = new Request(`${apiUrl}/me`, {
            method: 'GET',
            headers: new Headers({ 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token') || '',
            }),
        });

        return fetch(request)
            .then(response => {
                if (response.status > 400) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ data }) => {
                const decodedToken: CustomJwtPayload = jwtDecode(localStorage.getItem('access_token') || '');

                return Promise.resolve({
                    id: decodedToken.user_id,
                    fullName: data.username,
                    avatar: data.profile,
                });
            }).catch(() => {
                throw new Error('Network error')
            });
    }
};

export const authProvider = addRefreshAuthToAuthProvider(myAuthProvider, refreshAuth);