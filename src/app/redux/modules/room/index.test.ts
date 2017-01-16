import { expect } from 'chai';
import * as room from './';
import { IRoom, IRoomAction } from '../../../models/room';

describe('Room Module', () => {
  describe('Actions', () => {
    describe('Play', () => {
      it('has the correct type and player state', () => {
        const action: IRoomAction = room.play();
        expect(action.type).to.equal(room.SET_STATE);
        expect(action.payload.state).to.equal('playing');
      });
    });

    describe('Pause', () => {
      it('has the correct type and player state', () => {
        const action: IRoomAction = room.pause();
        expect(action.type).to.equal(room.SET_STATE);
        expect(action.payload.state).to.equal('paused');
      });
    });

    describe('Set Video', () => {
      it('has the correct type and video information', () => {
        const action: IRoomAction = room.setVideo('youtube', '0elg9WVytMs', 226);
        expect(action.type).to.equal(room.SET_VIDEO);
        expect(action.payload.video.source).to.equal('youtube');
        expect(action.payload.video.url).to.equal('0elg9WVytMs');
        expect(action.payload.video.duration).to.equal(226);
      });
    });

    describe('Set Volume', () => {
      it('has the correct type and volume', () => {
        const action: IRoomAction = room.setVolume(100); // Burstable Eardrum Mode
        expect(action.type).to.equal(room.SET_VOLUME);
        expect(action.payload.volume).to.equal(100);
      });
    });

    describe('Seek Time', () => {
      it('has the correct type and time', () => {
        const action: IRoomAction = room.seekTime(120);
        expect(action.type).to.equal(room.SEEK_TIME);
        expect(action.payload.time).to.equal(120);
      });
    });
  });

  describe('Reducer', () => {
    let state: IRoom = {
        id: 'random-id',
        state: 'loading',
        remoteState: null,
        volume: 100,
        syncTime: null,
        video: null,
        messages: [],
    };

    it('handles action of type SET_STATE', () => {
      const action: IRoomAction = { type: room.SET_STATE, payload: { state: 'playing' } };
      expect(room.reducer(state, action)).to.be.eql({
        id: 'random-id',
        state: 'playing',
        remoteState: null,
        volume: 100,
        syncTime: null,
        video: null,
        messages: [],
      });
    });

    it('handles action of type SEEK_TIME', () => {
      const action: IRoomAction = { type: room.SEEK_TIME, payload: { time: 120 } };
      expect(room.reducer(state, action)).to.be.eql({
        id: 'random-id',
        state: 'loading',
        remoteState: null,
        volume: 100,
        syncTime: 120,
        video: null,
        messages: [],
      });
    });

    it('handles action of type SET_VOLUME', () => {
      const action: IRoomAction = { type: room.SET_VOLUME, payload: { volume: 50 } };
      expect(room.reducer(state, action)).to.be.eql({
        id: 'random-id',
        state: 'loading',
        remoteState: null,
        volume: 50,
        syncTime: null,
        video: null,
        messages: [],
      });
    });

    it('handles action of type SET_VIDEO', () => {
      const action: IRoomAction = {
        type: room.SET_VIDEO,
        payload: {
          video: {
            source: 'youtube',
            url: '0elg9WVytMs',
            duration: 226,
          },
        },
      };

      expect(room.reducer(state, action)).to.deep.equal({
        id: 'random-id',
        state: 'loading',
        remoteState: null,
        volume: 100,
        syncTime: null,
        video: {
          source: 'youtube',
          url: '0elg9WVytMs',
          duration: 226,
        },
        messages: [],
      });
    });

    it('handles action of type NEW_MESSAGE', () => {
      const action: IRoomAction = { type: room.NEW_MESSAGE, payload: { message: 'New Message' } };
      expect(room.reducer(state, action)).to.be.eql({
        id: 'random-id',
        state: 'loading',
        remoteState: null,
        volume: 100,
        syncTime: null,
        video: null,
        messages: ['New Message'],
      });
    });

    it('handles actions with unknown type', () => {
      expect(room.reducer(state, { type: '', payload: {} })).to.be.eql({
        id: 'random-id',
        state: 'loading',
        remoteState: null,
        volume: 100,
        syncTime: null,
        video: null,
        messages: [],
      });
    });

  });
});
