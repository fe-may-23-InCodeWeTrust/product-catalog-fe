import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import { localStorageMiddleware } from './localeStorageMiddleWare';
import themeReducer from './themeReducer';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  cart: cartReducer,
  favorites: favoriteReducer,
  theme: themeReducer,
});

const store: Store<RootState> = createStore(
  reducers,
  applyMiddleware(localStorageMiddleware),
);

export type AppDispatch = typeof store.dispatch;

export default store;
