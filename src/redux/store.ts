import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import cartReducer from './cartReducer';
import { localStorageMiddleware } from './localeStorageMiddleWare';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  cart: cartReducer,
});

const store: Store<RootState> = createStore(
  reducers,
  applyMiddleware(localStorageMiddleware)
);

export type AppDispatch = typeof store.dispatch;

export default store;
