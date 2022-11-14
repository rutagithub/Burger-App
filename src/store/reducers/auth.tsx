import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

// Interfaces:
// action interface
interface Action {
  userId: number;
  error: boolean;
  type: string;
  idToken: string;
  path: string;
}

// State interface
interface State {}

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state: State, action: Action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state: State, action: Action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state: State, action: Action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state: State, action: Action) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const setAuthRedirectPath = (state: State, action: Action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    default:
      return state;
  }
};

export default reducer;
