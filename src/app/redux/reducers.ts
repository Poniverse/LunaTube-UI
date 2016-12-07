import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { IStore } from './IStore';
import { reducer as roomReducer } from './modules/room';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  room: roomReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
