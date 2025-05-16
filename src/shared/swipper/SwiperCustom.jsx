import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './SwiperCustom.module.css';
export default function SwiperCustom({
  items,
  renderItem,
  slidesPerView = 1.2,
  spaceBetween = 20,
  breakpoints = {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    992: { slidesPerView: 4 },
  },
  navigation = true,
  className = '',
  id = ''
}) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  useEffect(() => {
    if (swiperRef.current && navigation) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      checkOverflow();
    }
  }, [navigation, items]);

  const checkOverflow = () => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    const slidesPerView = swiper.params.slidesPerView;
    const isOverflow = items.length > slidesPerView;
    
    setIsOverflowing(isOverflow);
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper) => {
    setIsAtStart(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  return (
    <div className={`${styles.sliderContainer} ${className}`}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          checkOverflow();
        }}
        onSlideChange={handleSlideChange}
        onResize={checkOverflow}
        breakpoints={breakpoints}
        navigation={navigation ? {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        } : false}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${id}-${index}`}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {navigation && isOverflowing && (
        <>
          {!isAtStart && (
            <div ref={prevRef} className={`${styles.navBtn} ${styles.navBtnPrev}`} onClick={goPrev}>
              <i className="bi bi-chevron-left"></i>
            </div>
          )}
          {!isAtEnd && (
            <div ref={nextRef} className={`${styles.navBtn} ${styles.navBtnNext}`} onClick={goNext}>
              <i className="bi bi-chevron-right"></i>
            </div>
          )}
        </>
      )}
    </div>
  );
}