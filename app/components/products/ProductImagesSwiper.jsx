import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const ProductImagesSwiper = ({ imageFiles }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2 pb-2"
      >
        {imageFiles.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className="img-fluid rounded"
              alt={`Product Image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {imageFiles.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className="img-fluid rounded"
              alt={`Product Image Thumbnail ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default ProductImagesSwiper;
