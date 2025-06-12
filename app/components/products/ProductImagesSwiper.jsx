import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductImagesSwiper = ({ imageFiles = [], onRemove }) => {
  if (!imageFiles.length) {
    return <p>No images to display</p>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className="mySwiper2 pb-2"
    >
      {imageFiles.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="position-relative">
            <img
              src={image}
              className="img-fluid rounded"
              alt={`Product Image ${index + 1}`}
            />
            <button
              type="button"
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => onRemove(index)}
            >
              Remover
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImagesSwiper;