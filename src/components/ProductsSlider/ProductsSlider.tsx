import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation } from 'swiper';
import './ProductsSlider.scss';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ProductCard } from '../ProductCard';
import { LeapFrog } from '@uiball/loaders';

import 'swiper/scss';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Product } from '../../utils/Types/Product';

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

  const { width = 0 } = useWindowSize();

  const arrayToCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

  console.log(activeSlide);

  return (
    <>
      <div className="price__nav">
        <h1 className="title_price">{title}</h1>
        <div className="button">
          <button
            className="button__control"
            disabled={activeSlide === 0}
            onClick={handlePreviousClick}
          >
            <ArrowLeft />
          </button>
          <button
            disabled={activeSlide === arrayToCheck.length - slidesPerView}
            className="button__control"
            onClick={handleNextClick}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="swiper">
        {isLoading ? (
          <div className="loader">
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
                  <ProductCard product={card} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
