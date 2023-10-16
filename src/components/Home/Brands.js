import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import styles from "../../styles/home/home.module.css";
import image1 from "../../assets/logo.png";
import image2 from "../../assets/logo2.png";
// import styles from "@/styles/layouts/Card.module.css";
// import Image from "next/legacy/image";

const SwiperCards = ({ Brands }) => {
  // console.log(elements);
  return (
    <div className="container-xxl">
      <h2 className="main-title"> Our Brands</h2>
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
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[
          Autoplay,
          Pagination,
          // , Navigation
        ]}
        className="mySwiper"
      >
        {Brands &&
          Brands.map((ele) => {
            return (
              <SwiperSlide key={ele.id}>
                <div className={styles.PartnersImages}>
                  <img src={ele.image} alt={"logo" + ele.id} />
                </div>
              </SwiperSlide>
            );
          })}
        {/* 
        <SwiperSlide>
          <div className={styles.PartnersImages}>
            <img src={image1} alt={"logo"} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.PartnersImages}>
            <img src={image2} alt={"logo"} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.PartnersImages}>
            <img src={image1} alt={"logo"} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.PartnersImages}>
            <img src={image2} alt={"logo"} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.PartnersImages}>
            <img src={image1} alt={"logo"} />
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default SwiperCards;
