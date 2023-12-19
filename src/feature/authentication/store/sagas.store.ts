import { loginUser, registerUser, currentUser } from './api-service.store';
import { put } from 'redux-saga/effects'

import * as actions from './actions.store'

export function* userLogin({payload}: ReturnType<any>) {
  try {
    const loginRes = yield loginUser(payload)

    if (loginRes.response) {
      yield put(actions.authenticationFail(loginRes.response.data))
    } else {
      localStorage.setItem('accessToken', loginRes.data.accessToken)
      localStorage.setItem('refreshToken', loginRes.data.refreshToken)
      const currentUserRes = yield currentUser()
      localStorage.setItem('user', JSON.stringify(currentUserRes.data.data))
      yield put(actions.userLoginSuccess(loginRes.data))
    }
  } catch (error) {
    yield put(actions.authenticationFail(error.message))
  }
}

export function* userRegister({payload}: ReturnType<any>) {
  try {
    const response = yield registerUser(payload)

    if (response.response) {
      yield put(actions.authenticationFail(response.response.data))
    } else {
      yield put(actions.userRegisterSuccess(response.data))
    }
  } catch (error) {
    yield put(actions.authenticationFail(error.message))
  }
}
