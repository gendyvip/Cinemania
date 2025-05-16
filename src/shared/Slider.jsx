import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Slider({ items = [], slidesPerView = 5, children }) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={20}
      navigation
      modules={[Navigation]}
      className="generic-swiper"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          {children(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
