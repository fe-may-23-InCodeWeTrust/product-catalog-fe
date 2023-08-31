import { Store } from 'redux';

export const localStorageMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    const state = store.getState();

    localStorage.setItem('cart', JSON.stringify(state.cart.goods));

    return result;
  };
