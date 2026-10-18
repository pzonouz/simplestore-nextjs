"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React from "react";

export default ({ children }: { children: React.ReactNode[] }) => {
  return (
    <div className="relative h-[75vh]">
      <div className=" absolute w-full h-64 bg-sky-900">
        <p className="text-white text-2xl font-bold p-8">جدیدترین محصولات</p>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        className="absolute top-24 bg-transparent"
        loop={true}
        spaceBetween={2}
        slidesPerView={1}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        centeredSlides={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {children?.map((item) => (
          <SwiperSlide>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
