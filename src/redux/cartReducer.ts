/* eslint-disable @typescript-eslint/no-explicit-any */
const INCREASE_COUNT = 'INCREASE_COUNT';
const DECREASE_COUNT = 'DECREASE_COUNT';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const REMOVE_ALL = 'REMOVE_ALL';

type Product = {
  id: number;
  name: string;
  category: string;
  itemId: any;
  fullPrice: number;
  price: number;
  screen: any;
  capacity: any;
  color: string;
  ram: any;
  year: number;
  image: string;
  count: number;
};

const getGoods = (): Product[] => {
  const savedCartData = localStorage.getItem('cart');

  return savedCartData ? JSON.parse(savedCartData) : [];
};

const initialState = {
  goods: getGoods() as Product[],
};

type InitialState = typeof initialState;

const cartReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case INCREASE_COUNT:
      return {
        ...state,
        goods: state.goods.map((good) => {
          if (good.id === action.goodId) {
            return {
              ...good,
              count: good.count + 1,
            };
          } else {
            return good;
          }
        }),
      };

    case DECREASE_COUNT:
      return {
        ...state,
        goods: state.goods.map((good) => {
          if (good.id === action.goodId) {
            return {
              ...good,
              count: Math.max(1, good.count - 1),
            };
          } else {
            return good;
          }
        }),
      };

    case ADD_TO_CART:
      return {
        ...state,
        goods: [...state.goods, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        goods: state.goods.filter((good) => good.id !== action.goodId),
      };

    case REMOVE_ALL:
      return {
        ...state,
        goods: [],
      };

    default:
      return state;
  }
};

//action creators
export const increaseCount = (goodId: number): IncreaseCount => {
  return {
    type: INCREASE_COUNT,
    goodId,
  };
};

export const decreaseCount = (goodId: number): DecreaseCount => {
  return {
    type: DECREASE_COUNT,
    goodId,
  };
};

export const addToCart = (product: any): AddToCart => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (goodId: number): RemoveFromCart => {
  return {
    type: REMOVE_FROM_CART,
    goodId,
  };
};

export const removeAll = (): RemoveAll => {
  return {
    type: REMOVE_ALL,
  };
};

type IncreaseCount = {
  type: typeof INCREASE_COUNT;
  goodId: number;
};

type DecreaseCount = {
  type: typeof DECREASE_COUNT;
  goodId: number;
};

type AddToCart = {
  type: typeof ADD_TO_CART;
  payload: Product;
};

type RemoveFromCart = {
  type: typeof REMOVE_FROM_CART;
  goodId: number;
};

type RemoveAll = {
  type: typeof REMOVE_ALL;
};

export default cartReducer;
