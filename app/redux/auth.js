import axios from 'axios'

export const AUTH_LOGIN_START = 'eqtv/auth/LOGIN_START';
export const AUTH_LOGIN_COMPLETE = 'eqtv/auth/LOGIN_COMPLETE';
export const AUTH_LOGIN_CANCELLED = 'eqtv/auth/LOGIN_CANCELLED';
export const AUTH_LOGIN_ERROR = 'eqtv/auth/LOGIN_ERROR';
export const AUTH_LOGOUT = 'eqtv/auth/LOGOUT';
export const AUTH_SHOW_MODAL = 'eqtv/auth/SHOW_MODAL';

const initialState = {
  authenticating: false,
  showModal: false,
  showErrorModal: false,
  user: null,
  accessToken: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return {
        ...state,
        authenticating: true,
        showModal: false,
        showErrorModal: false
      };
    case AUTH_LOGIN_COMPLETE:
      return {
        ...state,
        authenticating: false,
        user: action.user,
        accessToken: action.token
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        showErrorModal: action.showErrorModal
      };
    case AUTH_LOGIN_CANCELLED:
    case AUTH_LOGOUT:
      return initialState;
    case AUTH_SHOW_MODAL:
      return {
        ...state,
        showModal: action.showModal
      };
    default:
      return state;
  }
}

function loginStart() {
  return {
    type: AUTH_LOGIN_START
  };
}

function loginComplete(user, token) {
  return {
    type: AUTH_LOGIN_COMPLETE,
    user,
    token
  };
}

function loginCancelled() {
  return {
    type: AUTH_LOGIN_CANCELLED
  };
}

function logoutComplete() {
  return {
    type: AUTH_LOGOUT
  };
}

function showAuthModal(showModal) {
  return {
    type: AUTH_SHOW_MODAL,
    showModal
  };
}

function showAuthError(showErrorModal) {
  return {
    type: AUTH_LOGIN_ERROR,
    showErrorModal
  }
}

function initPostMessages(dispatch) {
  function handleEvent(e) {
    if (e.origin === axios.defaults.baseURL) {
      if (e.data === 'show_modal') {
        dispatch(showAuthModal(true));
      } else if (e.data.error) {
        dispatch(showAuthModal(false));
        dispatch(showAuthError(true));
      } else if (e.data.user != null) {
        dispatch(setCurrentUser(e.data))
      }
    }
  }
  window.addEventListener('message', handleEvent);
}

function setCurrentUser({user, token}) {
  return (dispatch) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // TODO: Send a login request / connect to the web socket
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
    dispatch(showAuthModal(false));
    dispatch(loginComplete(user, token));
  };
}

export function login() {
  return (dispatch) => {
    dispatch(loginStart());
    initPostMessages(dispatch);
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    dispatch(logoutComplete());
  };
}

export function cancelLogin() {
  return (dispatch) => {
    dispatch(showAuthModal(false));
    dispatch(showAuthError(false));
    dispatch(loginCancelled());
  };
}
