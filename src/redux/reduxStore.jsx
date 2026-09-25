import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER } from "redux-persist";
import storages from "redux-persist/lib/storage";
import { ProductReducer } from "./reducer";

const storage = storages.default || storages;

// 1. Wrap ProductReducer in combineReducers with key 'ProductReducer'
const rootReducer = combineReducers({
  ProductReducer,
});

const persistConfig = {
  key: "E-COMMERCE",
  storage,
};

// 2. Persist the combined rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(reduxStore);
export default reduxStore;