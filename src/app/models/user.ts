export interface IUserState {
  isAuthenticating: boolean;
  loggedInUser: IUser;
}

export interface IUserAction {
  type: string;
  payload?: {
    user?: IUser
  };
}

export interface IUser {
  id: string;
  name: string;
}
