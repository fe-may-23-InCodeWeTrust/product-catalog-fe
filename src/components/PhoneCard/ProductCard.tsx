import "./ProductCard.scss";
import React from 'react';


export const Card: React.FC= () => {
  return (
    <div className="phone-card">
        <div
          className="phone-card__image-container"
        >
          <img
            src="https://www.vodafone.co.uk/business/media/image/1508926516174/img-1300x1000-apple-iphone-14-pro-max-deep-purple-product.png"
            alt="phone"
            className="phone-card__image"
          />
        </div>

        <h3 className="phone-card__title text-body">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h3>

      <div className="phone-card__price-block">
        <p className="phone-card__price h3">$799</p>
        <p className="phone-card__price-discount">$999</p>
      </div>

      <div className="phone-card__divider"></div>

      <div className="phone-card__info">
        <div className="phone-card__details">
          <span className="phone-card__attribute">Screen</span>
          <span>6.5” OLED</span>
        </div>
        <div className="phone-card__details">
          <span className="phone-card__attribute">Capacity</span>
          <span>64 GB</span>
        </div>
        <div className="phone-card__details">
          <span className="phone-card__attribute">RAM</span>
          <span>4 GB</span>
        </div>
      </div>

      <div className="phone-card__actions">
        <button
          type="submit"
          className="addToCart text-button">
            Add to cart
        </button>

        <button
          className="addToWishlist"
          type="submit"
        >
        </button>
      </div>
    </div>
  );
};