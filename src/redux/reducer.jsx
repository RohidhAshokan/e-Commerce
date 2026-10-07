import { PRODUCT_LIST_JSON } from "../PRODUCT_LIST_JSON";
import {
  GET_FILTER_STATUS,
  GET_PRODUCT_LIST,
  GET_SEARCH_TEXT,
  GET_ORDER_LIST,
  GET_CATEGORIES_CB,
  GET_COLORS_CB,
  GET_CATEGORY_ID,
} from "./types";

const initialState = {
  productList: PRODUCT_LIST_JSON,
  searchText: "",
  isFilter: true,
  orderList: [],
  categoriesCb: [],
  colorsCb: [],
  categoryId: [],
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

    case GET_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
      };

    case GET_CATEGORIES_CB:
      return {
        ...state,
        categoriesCb: action.payload,
      };

    case GET_COLORS_CB:
      return {
        ...state,
        colorsCb: action.payload,
      };

    case GET_CATEGORY_ID:
      return {
        ...state,
        categoryId: action.payload,
      };

    default:
      return state;
  }
}
