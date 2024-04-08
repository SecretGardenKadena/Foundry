// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import accountReducer from "./reducers/accountReducer"; // Import the accountReducer

// Define the persist config for each reducer you want to persist
const authPersistConfig = {
  key: "auth",
  storage,
};

const globalPersistConfig = {
  key: "global",
  storage,
};

const accountPersistConfig = {
  key: "account",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedGlobalReducer = persistReducer(globalPersistConfig, globalReducer);
const persistedAccountReducer = persistReducer(accountPersistConfig, accountReducer);

const Store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    accountReducer: persistedAccountReducer, // Include the accountReducer
    globalReducer: persistedGlobalReducer,
  },
});

export const persistor = persistStore(Store);

export default Store;
