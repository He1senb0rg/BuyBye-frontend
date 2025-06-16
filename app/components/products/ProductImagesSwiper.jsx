import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const BACKEND_URL = "http://localhost:3000";

const getImageUrl = (image) => {
  if (!image) return "/assets/images/cao.gif";
  if (typeof image === "string") return image;
  if (image.url && image.url.startsWith("http")) return image.url;
  if (image.url) return `${BACKEND_URL}/${image.url}`;
  return "/assets/images/cao.gif";
};

const ProductImagesSwiper = ({ imageFiles = [], onRemove }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!imageFiles.length) {
    return <p>Sem imagens para mostrar</p>;
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2 pb-2 w-75"
      >
        {imageFiles.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="position-relative">
              <img
                src={getImageUrl(image)}
                className="img-fluid rounded"
                alt={`Product Image ${index + 1}`}
              />
            </div>
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
              src={getImageUrl(image)}
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