import { IUserState, IUserAction, IUser } from '../../../models/user';
import axios from 'axios';

export const SET_USER = 'user/SET_USER';
export const START_AUTH = 'user/START_AUTH';
export const FINISH_AUTH = 'user/FINISH_AUTH';
export const SET_JWT = 'user/SET_JWT';
export const LOGOUT = 'user/LOGOUT';

const initialState: IUserState = {
  isAuthenticating: false,
  jwt: null,
  loggedInUser: null,
};

export function reducer(state = initialState, action: IUserAction) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loggedInUser: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        loggedInUser: null,
      };
    case START_AUTH:
      return {
        ...state,
        isAuthenticating: true,
      };
    case FINISH_AUTH:
      return {
        ...state,
        isAuthenticating: false,
      };
    case SET_JWT:
      return {
        ...state,
        jwt: action.payload.jwt,
      };
    default:
      return state;
  }
}

export function startAuth(): IUserAction {
  return {
    type: START_AUTH,
  };
}

export function finishAuth(): IUserAction {
  return {
    type: FINISH_AUTH,
  };
}

export function logout() {
  return dispatch => {
    axios
      .post('/auth/logout', {}, {
        baseURL: '', // This request is being made to the local node server
      })
      .then(response => {
        const action: IUserAction = {
          type: LOGOUT,
        };

        dispatch(action);
      });
  };
}

export function setUser(user: IUser): IUserAction {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
}

export function setJwt(jwt: string): IUserAction {
  return {
    type: SET_JWT,
    payload: {
      jwt,
    },
  };
}
