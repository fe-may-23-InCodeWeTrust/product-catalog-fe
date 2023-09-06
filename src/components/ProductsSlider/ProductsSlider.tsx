import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation } from 'swiper';
import styles from './ProductsSlider.module.scss';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ProductCard } from '../ProductCard';
import { LeapFrog } from '@uiball/loaders';

import 'swiper/scss';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Product } from '../../utils/Types/Product';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favoriteReducer';
import { addToCart } from '../../redux/cartReducer';

type ProductsSliderProps = {
  title: string;
  products: Product[];
  isLoading: boolean;
};

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  products,
  isLoading,
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const faviritesGoods = useSelector(
    (state: RootState) => state.favorites.favoriteGoods,
  );
  const dispatch = useDispatch<AppDispatch>();

  const toggleFavorites = (product: Product) => {
    const foundedGood = faviritesGoods.find((good) => good.id === product.id);

    if (foundedGood) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const addProductToCart = (product: Product) => {
    dispatch(
      addToCart({
        ...product,
        count: 1,
      }),
    );
  };

  const { width = 0 } = useWindowSize();

  const handleNextClick = () => {
    if (swiper) swiper.slideNext();
  };

  const handlePreviousClick = () => {
    if (swiper) swiper.slidePrev();
  };

  const slidesPerView = useMemo(() => {
    if (width >= 1200) {
      return 4;
    }

    if (width >= 768) {
      return 3;
    }

    if (width >= 640 && width < 1200) {
      return 2;
    }

    return 1;
  }, [width]);

  return (
    <>
      <div className={styles['price__nav']}>
        <h1 className={styles['title_price']}>{title}</h1>
        <div className={styles['button']}>
          <button
            className={styles['button__control']}
            disabled={activeSlide === 0}
            onClick={handlePreviousClick}
          >
            <ArrowLeft />
          </button>
          <button
            disabled={activeSlide === products.length - slidesPerView}
            className={styles['button__control']}
            onClick={handleNextClick}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className={styles['swiper']}>
        {isLoading ? (
          <div className={styles['loader']}>
            <LeapFrog size={40} speed={2.5} color="black" />
          </div>
        ) : (
          <Swiper
            onSwiper={(swiper) => {
              setSwiper(swiper);
            }}
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={slidesPerView}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          >
            {products.map((card) => (
              <SwiperSlide key={card.id}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ProductCard
                    product={card}
                    onAddToCart={addProductToCart}
                    onToggleFavorites={toggleFavorites}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
