import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { authStateReducer } from "redux-auth";
import { reducer as messages } from './redux/message';
import { reducer as channel } from './redux/channel';
import { reducer as user } from './redux/user';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  auth: authStateReducer,
  routing,
  form,
  messages,
  channel,
  user
});

export default rootReducer;
