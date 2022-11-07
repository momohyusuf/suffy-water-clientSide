import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
const Slider = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={100}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <h3>Modern Technology</h3>
        <p>
          Using state of the art facilities, we ensure that our water go through
          rigorous and proper treatment process using industry guidelines
          stipulated by NAFDAC and also ensuring it is safe for human
          consumption.
        </p>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          {" "}
          <h3>Over 8years Experience</h3>
          <p>
            We've been providing affordable drinking Water to Nigerians for over
            8 years.{" "}
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <h3>Customer's Satisfaction</h3>
        <p>
          Trusted by more than 100,000 household. Over the years we've made
          customer's satisfaction our priority. We're continually exploring ways
          to even satisfy our customers better.
        </p>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
