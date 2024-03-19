import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { productApi } from './services/product'

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
});

type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
      preloadedState
  });
};