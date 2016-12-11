import { IRoom } from '../models/room';
import { IUserState } from '../models/user';

export interface IStore {
  room: IRoom;
  user: IUserState;
};
