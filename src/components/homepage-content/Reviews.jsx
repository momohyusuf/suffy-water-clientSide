import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { MdLocationPin } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
const Reviews = () => {
  return (
    <section className="reviews--container">
      <div className="slider--container">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={100}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div>
              {" "}
              <h3>Muhammed Abubakar</h3>
              <small>
                <MdLocationPin color="#D62246" />
                Auchi, Edo State.
              </small>
              <p>
                <q>
                  I have been a customer of suffy's water for 5years+. They've
                  never disappointed me once.
                </q>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              {" "}
              <h3>Rejoice Sammuel</h3>
              <small>
                <MdLocationPin color="#D62246" />
                Aviele, Edo State.
              </small>{" "}
              <p>
                <q>
                  My Customers dey always ask for one water and na suffy water.
                  they say e clean, no get smell, no get taste and e good for
                  their body
                </q>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              {" "}
              <h3>Aminat Isah</h3>
              <small>
                <MdLocationPin color="#D62246" />
                Agbede, Edo State.
              </small>
              <p>
                {" "}
                <q>
                  Since the introduction of their online service, i worry less
                  about getting water now. I just place order online and wait
                  for them to deliver to me. And they are always fast
                </q>
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              {" "}
              <h3>Maimunat Oshoke</h3>
              <small>
                <MdLocationPin color="#D62246" />
                Auchi, Edo State.
              </small>
              <p>
                {" "}
                <q>
                  Their drivers are among they best. they have good customer
                  relationship
                </q>
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div>
        <h2>What they are saying about us</h2>
      </div>
    </section>
  );
};

export default Reviews;
