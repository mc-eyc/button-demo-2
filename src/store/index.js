import { createStore, combineReducers } from "redux";

import reducers from "./reducers";

export default function () {
  return createStore(combineReducers(reducers));
}