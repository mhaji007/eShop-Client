import {combineReducers} from 'redux';
import {userReducer} from './userReducer';

// Combines multiple reducers into one
// that is passed into the store in the
// App component
const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer;
