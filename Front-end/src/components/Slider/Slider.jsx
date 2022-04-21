import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";
import SliderCard from "../SliderCard/SliderCard";

// install Swiper modules
SwiperCore.use([Navigation]);

export default function Slider({ paints }) {
  return (
    <>
      <Swiper style={{ paddingTop: "115px" }} navigation={true}>
        {paints?.map((e, i) => (
          <SwiperSlide key={i}>
            <SliderCard e={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
