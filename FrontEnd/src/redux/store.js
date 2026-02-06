import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cardReducer from "./features/card/CardSlice";
import cartReducer from "./features/cart/CartSlice";
import compareReducer from "./features/cart/ComparisionSlice";
import recentlyViewReducer from "./features/RecentlyView/RecentlyViewSlice";

const rootReducer = combineReducers({
  card: cardReducer,
  cart: cartReducer,
  compareItem: compareReducer,
  recentlyView: recentlyViewReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
