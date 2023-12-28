import jwt_decode from 'jwt-decode'

const ADMIN_ROLE_ID = "a1582ba5-d764-4a15-b181-657e8753869b"

export function checkAdminAuth() {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) return false

  try {
    let { role_id, user_id }: any = jwt_decode(accessToken)

    if (role_id !== ADMIN_ROLE_ID) {
      return false
    }

    return user_id

  } catch (error) {
    return false
  }
}

export function getUserData() {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) return false

  let { user_id }: any = jwt_decode(accessToken)

  return user_id
}
