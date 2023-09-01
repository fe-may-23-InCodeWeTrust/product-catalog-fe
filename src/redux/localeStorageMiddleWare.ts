/* eslint-disable @typescript-eslint/no-explicit-any */
export const localStorageMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    const state = store.getState();

    if (
      action.type === 'ADD_TO_FAVORITES'
      || action.type === 'REMOVE_ALL_FAVORITES'
      || action.type === 'REMOVE_FROM_FAVORITES'
    ) {
      localStorage.setItem('favorites', JSON.stringify(state.favorites.favoriteGoods));
    } else {
      localStorage.setItem('cart', JSON.stringify(state.cart.goods));
    }

    return result;
  };
