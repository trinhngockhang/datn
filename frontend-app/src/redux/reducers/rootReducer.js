import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import globalReducer from "./globalReducer";
import wishlistReducer from "./wishlistReducer";
import shopReducer from "./shopReducer";
import userReducer from './userReducer';

const rootReducer = combineReducers({
  cartReducer,
  globalReducer,
  wishlistReducer,
  shopReducer,
  userReducer
});

export default rootReducer;
