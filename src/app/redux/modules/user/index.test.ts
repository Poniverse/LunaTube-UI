import {  expect } from 'chai';
import * as user from './';
import { IUserState, IUserAction, IUser } from '../../../models/user';

describe('User Module', () => {
  describe('Actions', () => {
    describe('Start Auth', () => {
      it('has the correct type', () => {
        const action: IUserAction = user.startAuth();
        expect(action.type).to.equal(user.START_AUTH);
      });
    });

    describe('Finish Auth', () => {
      it('has the correct type', () => {
        const action: IUserAction = user.finishAuth();
        expect(action.type).to.equal(user.FINISH_AUTH);
      });
    });

    describe('Logout', () => {
      it('has the correct type', () => {
        const action: IUserAction = user.logout();
        expect(action.type).to.equal(user.LOGOUT);
      });
    });

    describe('Set User', () => {
      it('has the correct type and user information', () => {
        const mockedUser: IUser = {
          id: 'id',
          name: 'test',
        };

        const action: IUserAction = user.setUser(mockedUser);
        expect(action.type).to.equal(user.SET_USER);
        expect(action.payload.user.id).to.equal(mockedUser.id);
        expect(action.payload.user.name).to.equal(mockedUser.name);
      });
    });
  });

  describe('Reducer', () => {

    let state: IUserState = {
      isAuthenticating: false,
      loggedInUser: null,
    };

    it('handles action of type START_AUTH', () => {
      const action: IUserAction = { type: user.START_AUTH };
      expect(user.reducer(state, action)).to.be.eql({
        isAuthenticating: true,
        loggedInUser: null,
      });
    });

    it('handles action of type FINISH_AUTH', () => {
      const action: IUserAction = { type: user.FINISH_AUTH };
      expect(user.reducer(state, action)).to.be.eql({
        isAuthenticating: false,
        loggedInUser: null,
      });
    });

    it('handles action of type LOGOUT', () => {
      const action: IUserAction = { type: user.LOGOUT };
      expect(user.reducer(state, action)).to.be.eql({
        isAuthenticating: false,
        loggedInUser: null,
      });
    });

    it('handles action of type SET_USER', () => {
      const action: IUserAction = {
        type: user.SET_USER,
        payload: {
          user: {
            id: 'id',
            name: 'test',
          },
        },
      };

      expect(user.reducer(state, action)).to.deep.equal({
        isAuthenticating: false,
        loggedInUser: {
          id: 'id',
          name: 'test',
        },
      });
    });

    it('handles actions with unknown type', () => {
      expect(user.reducer(state, { type: '', payload: {} })).to.be.eql({
        isAuthenticating: false,
        loggedInUser: null,
      });
    });

  });
});
