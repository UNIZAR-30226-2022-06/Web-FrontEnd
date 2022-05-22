import { ActionTypes } from "../constants/action_types";
const intialState = {
  books: [],
};

export const booksReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BOOKS:
      return { ...state, books: payload };
    default:
      return state;
  }
};

export const selectedBooksReducer = (state = {}, { type, payload }) => {
    console.log(type);
    switch (type) {
      case ActionTypes.SELECTED_BOOK:
        return { ...state, ...payload };
      case ActionTypes.REMOVE_SELECTED_BOOK:
        return {};
      default:
        return state;
    }
  };
