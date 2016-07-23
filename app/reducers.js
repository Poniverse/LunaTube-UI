import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as messages } from './redux/message';
import { reducer as channel } from './redux/channel';
import { reducer as auth } from './redux/auth';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  routing,
  form,
  messages,
  channel,
  auth
});

export default rootReducer;
