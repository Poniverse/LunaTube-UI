export interface IUserState {
  isAuthenticating: boolean;
  jwt: string;
  loggedInUser: IUser;
}

export interface IUserAction {
  type: string;
  payload?: {
    jwt?: string,
    user?: IUser
  };
}

export interface IUser {
  id: string;
  name: string;
}
