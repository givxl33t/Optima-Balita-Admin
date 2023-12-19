import jwt_decode from 'jwt-decode'

export function checkAdminAuth() {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) return false

  try {
    let { role_id, user_id }: any = jwt_decode(accessToken)

    if (role_id !== "8cb07c50-0735-4df8-8e51-8f15c3fb3a5d") {
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
