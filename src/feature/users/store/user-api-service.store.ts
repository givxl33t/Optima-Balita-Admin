import http from '../../../commons/http-istance.common'

const PREFIX = 'https://optimabalita.dev/api/user'

export const getUsersApi = () => http.get(PREFIX)

export const getUsersDataApi = () => http.get(PREFIX)

export const getUserByIdApi = (id: string) => http.get(`${PREFIX}/${id}`)

export const deleteUserApi = (id: string) => http.delete(`${PREFIX}/${id}`)

export const editUserApi = (id: string, data: any) => http.put(`${PREFIX}/${id}`, data).catch(function (error) {
  if (error) {
    return error
  }
})

