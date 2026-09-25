import { GET_FILTER_STATUS, GET_PRODUCT_LIST, GET_SEARCH_TEXT } from "./types";

export const getProductList = (params) => {
  return {
    type: GET_PRODUCT_LIST,
    payload: params,
  };
};
export const getSearchText = (params) => {
  return {
    type: GET_SEARCH_TEXT,
    payload: params,
  };
};
export const getFilterStatus = (params) => {
  return {
    type: GET_FILTER_STATUS,
    payload: params,
  };
};
