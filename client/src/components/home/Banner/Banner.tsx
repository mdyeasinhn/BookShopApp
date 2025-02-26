// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import bgImg1 from '../../../assets/images/a3ljatulrr8v4k2r19k9.jpg'
import bgImg2 from '../../../assets/images/a3ljatulrr8v4k2r19k9.jpg'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';


export default function Banner() {
  return (
    <div className='container px-6 py-6 mx-auto '>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop = {true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Slide image={bgImg1} text="Discover a World of Books at Your Fingertips"/>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bgImg2} text="Manage Your Bookshop Seamlessly with Our App"/>
        </SwiperSlide>   
        
        
      </Swiper>
    </div>
  );
}