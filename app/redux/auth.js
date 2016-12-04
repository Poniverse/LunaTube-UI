import axios from 'axios';

export const SET_USER = 'eqtv/auth/SET_USER';
export const START_AUTH = 'eqtv/auth/START_AUTH';
export const FINISH_AUTH = 'eqtv/auth/FINISH_AUTH';

const initialState = {
  showAuthModal: false,
  user: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.data
      };
    case START_AUTH:
      return {
        ...state,
        showAuthModal: true
      };
    case FINISH_AUTH:
      return {
        ...state,
        showAuthModal: false
      };
    default:
      return state;
  }
}

export function startAuth() {
  return {
    type: START_AUTH
  }
}

export function finishAuth() {
  return {
    type: FINISH_AUTH
  }
}

export function storeAuthAndUser({user, jwt, exp}) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + jwt;

  return setUser(user);
}

export function setUser(user) {
  return {
    type: SET_USER,
    data: user
  }
}

export function logout() {
  return initialState;
}
