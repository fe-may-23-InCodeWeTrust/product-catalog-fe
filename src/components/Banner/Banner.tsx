import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import 'swiper/scss';
import styles from './Banner.module.scss';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css/autoplay';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { ArrowLeftDarkTheme } from '../../assets/icons/ArrowLeftDarkTheme';
import { ArrowRightDarkTheme } from '../../assets/icons/ArrowRightDarkTheme';
const desktopImages: string[] = [
  'https://product-catalog-be-lf4l.onrender.com/img/Banner.png',
  'https://product-catalog-be-lf4l.onrender.com/img/banner-apple%20watch.jpeg',
  'https://product-catalog-be-lf4l.onrender.com/img/iphone-14-pro.jpg',
];

const mobileImages: string[] = [
  'https://product-catalog-be-lf4l.onrender.com/img/BannerMobile.png',
  'https://product-catalog-be-lf4l.onrender.com/img/banner-apple%20watch.jpeg',
  'https://product-catalog-be-lf4l.onrender.com/img/iphone-14-pro.jpg',
];

export const Banner = () => {
  const darkMode = useSelector((state: any) => state.theme.darkMode);
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
    <div className={styles['banner']}>
      <button
        className={styles['banner__button']}
        onClick={handlePreviousClick}
      >
        {darkMode ? <ArrowLeftDarkTheme /> : <ArrowLeft />}
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
            <div className={styles['banner__container']}>
              <img src={i} alt="BannerImg" className={styles['banner__img']} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={styles['banner__button']} onClick={handleNextClick}>
        {darkMode ? <ArrowRightDarkTheme /> : <ArrowRight />}
      </button>
    </div>
  );
};
