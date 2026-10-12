import {
  GET_FILTER_STATUS,
  GET_PRODUCT_LIST,
  GET_SEARCH_TEXT,
  GET_ORDER_LIST,
  GET_CATEGORIES_CB,
  GET_COLORS_CB,
  GET_CATEGORY_ID,
} from "./types";

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
export const getOrderList = (params) => {
  return {
    type: GET_ORDER_LIST,
    payload: params,
  };
};
export const getCategoriesCb = (params) => {
  return {
    type: GET_CATEGORIES_CB,
    payload: params,
  };
};
export const getColorsCb = (params) => {
  return {
    type: GET_COLORS_CB,
    payload: params,
  };
};

export const getCategoryId = (params) => {
  return {
    type: GET_CATEGORY_ID,
    payload: params,
  };
};
