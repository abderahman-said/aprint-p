import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import styles from "@/styles/layouts/Card.module.css";
// import Image from "next/legacy/image";
// import Card from "../Card/Card";
const ServicesSwiper = ({ elements }) => {
  // console.log(elements);
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[
          Autoplay,
          // , Navigation
        ]}
        // modules={[Pagination]}
        className="mySwiper"
      >
        {elements &&
          elements.map((ele) => {
            return (
              <SwiperSlide key={ele}>
                <div className="ImagesMain">
                  <img src={ele} alt="images" />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default ServicesSwiper;
