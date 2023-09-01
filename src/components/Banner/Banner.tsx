import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import BannerImg from '../../assets/icons/Banner.png';
import BannerMobileImg from '../../assets/icons/BannerMobile.png';
import 'swiper/scss';
import './Banner.scss';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css/autoplay';
import { useWindowSize } from '../../hooks/useWindowSize';
const desktopImages: string[] = [BannerImg, BannerImg, BannerImg];
const mobileImages: string[] = [
  BannerMobileImg,
  BannerMobileImg,
  BannerMobileImg,
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

  console.log(imageArray);

  useEffect(() => {
    if (swiper && !swiper?.autoplay?.running) {
      console.log('eeeepppp', swiper);
      swiper?.autoplay?.run();
    }
  }, [swiper]);

  console.log(swiper);

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
            <img src={i} alt="BannerImg" className="banner__img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="banner__button" onClick={handleNextClick}>
        <ArrowRight />
      </button>
    </div>
  );
};
