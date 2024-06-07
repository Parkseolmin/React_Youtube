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
      <h2>⚡Streamer Recommend</h2>
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
