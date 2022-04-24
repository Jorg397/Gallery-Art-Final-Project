import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import Swiper core and required modules
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import SliderCard from "../SliderCard/SliderCard";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay, Pagination]);

import s from "./slider.module.css";

export default function Slider({ paints }) {
	return (
		<>
			<Swiper
				id='slider'
				style={{ paddingTop: "115px" }}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
					dynamicBullets: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className={`${s.container} h-screen`}>
				{paints?.map((e, i) => (
					<SwiperSlide key={i}>
						<SliderCard e={e} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
