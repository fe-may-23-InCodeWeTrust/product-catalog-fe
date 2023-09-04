import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import { localStorageMiddleware } from './localeStorageMiddleWare';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  cart: cartReducer,
  favorites: favoriteReducer,
});

const store: Store<RootState> = createStore(
  reducers,
  applyMiddleware(localStorageMiddleware),
);

export type AppDispatch = typeof store.dispatch;

export default store;
