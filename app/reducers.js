import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as messages } from './redux/message';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  routing,
  form,
  messages
});

export default rootReducer;
