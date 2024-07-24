import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { streamers } from 'data/Streamers';
import { Link } from 'react-router-dom';

export default function Stramers() {
  return (
    <section id='Streamers'>
      <div className='flex ps-3 items-center gap-2 mb-5'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          focusable='false'
        >
          <g>
            <path
              d='M17.77,10.32l-1.2-.5L18,9.06a3.74,3.74,0,0,0-3.5-6.62L6,6.94a3.74,3.74,0,0,0,.23,6.74l1.2.49L6,14.93a3.75,3.75,0,0,0,3.5,6.63l8.5-4.5a3.74,3.74,0,0,0-.23-6.74Z'
              fill='red'
            ></path>
            <polygon
              points='10 14.65 15 12 10 9.35 10 14.65'
              fill='#fff'
            ></polygon>
          </g>
        </svg>
        <p className='text-xl'>추천 스트리머</p>
      </div>
      <div className='streamers__inner'>
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
            1240: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
            1640: {
              slidesPerView: 9,
              spaceBetween: 20,
            },
            2000: {
              slidesPerView: 10,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation, Autoplay]}
          className='mySwiper'
        >
          {streamers.map((streamer, index) => {
            return (
              <SwiperSlide key={index}>
                <div className='streamer' key={index}>
                  <div className='streamer__img play__icon'>
                    <Link to={`/channel/${streamer.channelId}`}>
                      <img src={streamer.img} alt={streamer.name} />
                    </Link>
                  </div>
                  <div className='streamer__info'>
                    <Link to={`/channel/${streamer.channelId}`}>
                      {streamer.name}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
