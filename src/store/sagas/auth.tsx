import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

// Action interface

// interface Action {
//   removeItem: string;
//   expirationTime: number;
//   email: string;
//   password: string;
//   isSignup: boolean;
// }

// Response interface
interface Response {
  data: {
    idToken: string;
    localId: string;
    expiresIn: number;
    error: boolean;
  }
}

// Exp date interface 
interface ExpDate {
  expirationDate: string;
  getTime: Function;
}

export function* logoutSaga() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeOutSaga(action: any) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action: any) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKGrbEJFZ7Ns52S-59VFlCLs-D830yCto';

  if (!action.isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKGrbEJFZ7Ns52S-59VFlCLs-D830yCto';
  }

  try {
    const response: Response = yield axios.post(url, authData);

    const expirationDate: string = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate.toString());
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeOut(response.data.expiresIn));
  } catch (error: any) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token: string =  yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
      const expirationDate: ExpDate = yield new Date((localStorage.getItem('expirationDate')) as string);
      if (expirationDate <= (new Date() as any)) {
        yield put(actions.logout());
      } else {
          const userId: string = yield localStorage.getItem('userId');
          yield put(actions.authSuccess(token, userId));
          yield put(actions.checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
  }
}