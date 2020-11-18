
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";

// Combines multiple reducers into one
// that is passed into the store in the
// index component
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer
});

export default rootReducer;
