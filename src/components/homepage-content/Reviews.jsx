import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { MdLocationPin } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { reviews } from '../../data/reviews';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
const Reviews = () => {
  return (
    <section className="reviews--container">
      <div className="reviews--content">
        <h2>REVIEWS</h2>
        <div className="slider--container">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={100}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div>
                  <h3>{review.name}</h3>
                  <small
                    style={{
                      margin: '0.4rem 0',
                    }}
                  >
                    <MdLocationPin color="#D62246" />
                    {review.location}
                  </small>
                  <div>
                    <AiFillStar color="#FED700" />
                    <AiFillStar color="#FED700" />
                    <AiFillStar color="#FED700" />
                    <AiFillStar color="#FED700" />
                    <AiFillStar color="#FED700" />
                  </div>
                  <p>
                    {' '}
                    <q>{review.text}</q>
                  </p>{' '}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
