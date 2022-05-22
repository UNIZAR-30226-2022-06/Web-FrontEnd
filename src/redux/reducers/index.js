import { combineReducers } from "redux";
import { booksReducer, selectedBooksReducer } from "./booksReducer";

const reducers = combineReducers({
  allProducts: booksReducer,
  product: selectedBooksReducer,
});

export default reducers;