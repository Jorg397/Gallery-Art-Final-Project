import React from "react";
import NavBar from "../NavBar/NavBar";
import s from "./Landing.module.css";
import a from "../NavBar/NavBar.module.css";

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
export default function Landing() {
	return (
		<>
			<NavBar />
			<Swiper
				id='slider'
				style={{ paddingTop: "100px" }}
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
				<SwiperSlide>
					<img
						src='https://i.ibb.co/TWVT7yd/Sin-t-tulo-2.png'
						className='w-screen'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src='https://i.ibb.co/fD4cXC3/2.png'
						className='w-screen'
					/>
					;
				</SwiperSlide>
			</Swiper>
		</>
	);
}
