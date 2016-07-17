export const SET_USER = 'eqtv/user/SET_USER';

const initialState = {};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.data
      };
    default:
      return state;
  }
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
