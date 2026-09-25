import { PRODUCT_LIST_JSON } from "../PRODUCT_LIST_JSON";
import { GET_FILTER_STATUS, GET_PRODUCT_LIST, GET_SEARCH_TEXT } from "./types";

const initialState = {
  productList: PRODUCT_LIST_JSON,
  searchText: "",
  isFilter: false,
};

export function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    case GET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };

    case GET_FILTER_STATUS:
      return {
        ...state,
        isFilter: action.payload,
      };

    default:
      return state;
  }
}
