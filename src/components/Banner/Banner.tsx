import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import 'swiper/scss';
import './Banner.scss';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css/autoplay';
import { useWindowSize } from '../../hooks/useWindowSize';
const desktopImages: string[] = [
  'https://product-catalog-be-lf4l.onrender.com/img/Banner.png',
  'https://curved.de/media/webp/media/cache/head_teaser/cms/2020/09/Apple-Watch-Series-6.webp?v=2023090305',
  'https://images.frandroid.com/wp-content/uploads/2023/05/iphone-14-pro-frandroid-quinn-battick-e0o2dkbys9u-unsplash.jpg',
];

const mobileImages: string[] = [
  'https://product-catalog-be-lf4l.onrender.com/img/BannerMobile.png',
  'https://curved.de/media/webp/media/cache/head_teaser/cms/2020/09/Apple-Watch-Series-6.webp?v=2023090305',
  'https://images.frandroid.com/wp-content/uploads/2023/05/iphone-14-pro-frandroid-quinn-battick-e0o2dkbys9u-unsplash.jpg',
];

export const Banner = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const { width = 0 } = useWindowSize();

  const handleNextClick = () => {
    if (swiper) swiper.slideNext();
  };

  const handlePreviousClick = () => {
    if (swiper) swiper.slidePrev();
  };

  const imageArray = useMemo(() => {
    if (width < 640) {
      return mobileImages;
    } else {
      return desktopImages;
    }
  }, [width]);

  useEffect(() => {
    if (swiper && !swiper?.autoplay?.running) {
      swiper?.autoplay?.run();
    }
  }, [swiper]);

  return (
    <div className="banner">
      <button className="banner__button" onClick={handlePreviousClick}>
        <ArrowLeft />
      </button>
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          setSwiper(swiper);
        }}
        modules={[Autoplay, Navigation, Pagination]}
        navigation={true}
        loop={true}
      >
        {imageArray.map((i, index) => (
          <SwiperSlide key={index}>
            <div className="banner__container">
              <img src={i} alt="BannerImg" className="banner__img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="banner__button" onClick={handleNextClick}>
        <ArrowRight />
      </button>
    </div>
  );
};
