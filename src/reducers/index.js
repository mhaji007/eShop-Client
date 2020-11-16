
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

// Combines multiple reducers into one
// that is passed into the store in the
// index component
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rootReducer;
