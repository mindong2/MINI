import { BgField } from "../style/StartPage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
const BackgroundField = () => {
  return (
    <BgField>
      <Swiper
        className="mySwiper"
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: 5000,
        }}
        allowTouchMove={false}
        effect={"fade"}
      >
        <SwiperSlide className="swiper-slide bg_slide"></SwiperSlide>
        <SwiperSlide className="swiper-slide bg_slide bg_slide2"></SwiperSlide>
        <SwiperSlide className="swiper-slide bg_slide bg_slide3"></SwiperSlide>
        <SwiperSlide className="swiper-slide bg_slide bg_slide4"></SwiperSlide>
        <SwiperSlide className="swiper-slide bg_slide bg_slide5"></SwiperSlide>
      </Swiper>
    </BgField>
  );
};

export default BackgroundField;
