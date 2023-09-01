import { Product } from "../utils/Types/Product";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
const REMOVE_ALL_FAVORITES = 'REMOVE_ALL_FAVORITES';

const getFavorites = (): Product[] => {
  const savedFavoritesData = localStorage.getItem('favorites');

  return savedFavoritesData ? JSON.parse(savedFavoritesData) : [];
};

const initialState = {
  favoriteGoods: getFavorites() as Product[],
};

type InitialState = typeof initialState;

const favoriteReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteGoods: [...state.favoriteGoods, action.payload],
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteGoods: state.favoriteGoods.filter(
          (good) => good.id !== action.goodId
        ),
      };

    case REMOVE_ALL_FAVORITES:
      return {
        ...state,
        favoriteGoods: [],
      };


    default:
      return state;
  }
};

//action creators
export const addToFavorites = (product: Product): AddToFavorites => {
  return {
    type: ADD_TO_FAVORITES,
    payload: product,
  };
};

export const removeFromFavorites = (goodId: number): RemoveFromFavorites => {
  return {
    type: REMOVE_FROM_FAVORITES,
    goodId,
  };
};

export const removeAllFavorites = (): RemoveAll => {
  return {
    type: REMOVE_ALL_FAVORITES,
  };
};

type AddToFavorites = {
  type: typeof ADD_TO_FAVORITES;
  payload: Product;
};

type RemoveFromFavorites = {
  type: typeof REMOVE_FROM_FAVORITES;
  goodId: number;
};

type RemoveAll = {
  type: typeof REMOVE_ALL_FAVORITES;
};

type ActionsTypes = AddToFavorites
  | RemoveFromFavorites
  | RemoveAll;

export default favoriteReducer;
