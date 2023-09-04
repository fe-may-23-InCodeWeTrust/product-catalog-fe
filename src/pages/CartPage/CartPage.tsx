import './CartPage.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  removeAll,
} from '../../redux/cartReducer';
import { BackDrop } from '../../components/BackDrop/BackDrop';
import { Modal } from '../../components/Modal/Modal';
import { BackButton } from '../../components/BackButton/BackButton';

export const CartPage = () => {
  const goods = useSelector((state: RootState) => state.cart.goods);

  const dispatch = useDispatch<AppDispatch>();
  const [isBlackout, setIsBlackout] = useState(false);

  const total = goods
    .map((good) => good.price * good.count)
    .reduce((a, b) => a + b, 0);

  const goodsAmount = () => {
     return goods.map(good => good.count).reduce((a, b) => a + b) || 0;
  }

  const decreaseHandler = (goodId: number) => {
    dispatch(decreaseCount(goodId));
  };

  const increaseHandler = (goodId: number) => {
    dispatch(increaseCount(goodId));
  };

  const removeHandler = (goodId: number) => {
    dispatch(removeFromCart(goodId));
  };

  const checkoutHandler = () => {
    setIsBlackout(true);
  };

  const buyGoodsHandler = () => {
    setIsBlackout(false);
    dispatch(removeAll());
  };

  return (
    <div className="cart_container">
      <div>
        <BackButton />
      </div>

      <h2 className="title">Cart</h2>

      {isBlackout && (
        <>
          <BackDrop onClick={buyGoodsHandler} />
          <Modal price={total} onClose={buyGoodsHandler} />
        </>
      )}

      {!goods.length ? (
        <p>There is no goods in the cart. Please, add some goods!</p>
      ) : (
        <div className="main-content">
          <div className="cart-goods">
            {goods.map((good) => (
              <div className="cart-good" key={good.id}>
                <div className="cart-good__view">
                  <span
                    className="remove-btn"
                    onClick={() => removeHandler(good.id)}
                  ></span>

                  <img
                    src={`https://product-catalog-be-lf4l.onrender.com/${good.image}`}
                    alt={good.name}
                    className="good-img"
                  />

                  <span className="cart-good__title">{good.name}</span>
                </div>

                <div className="cart-good__price">
                  <div className="count">
                    <button
                      className="btn-round"
                      disabled={good.count === 1}
                      onClick={() => decreaseHandler(good.id)}
                    >
                      -
                    </button>

                    <span className="quantity">{good.count}</span>

                    <button
                      className="btn-round"
                      onClick={() => increaseHandler(good.id)}
                    >
                      +
                    </button>
                  </div>

                  <span className="good-price">${good.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-price">
            <div className="cart-price__number">${total}</div>

            <div className="cart-price__quantity">
              {`Total for ${goodsAmount()} ${goodsAmount() > 1 ? 'items' : 'item'}`}
            </div>

            <div className="br"></div>

            <button className="btn-block" onClick={checkoutHandler}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
