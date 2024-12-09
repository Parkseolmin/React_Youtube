import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Loading from './Loading';
import NotFound from './NotFound';
import { useYoutubeQuery } from 'hooks/useQuery';
import ListItemCard from './ListItemCard';

export default function PlaylistItem() {
  // const { youtube } = useYoutubeApi();
  // const {
  //   data: playlist,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['playlist'],
  //   queryFn: async () => {
  //     const result = await youtube.playlistitem();
  //     return {
  //       items: result.items,
  //       nextPageToken: result.nextPageToken,
  //     };
  //   },
  // });
  const {
    data: playlist,
    isLoading,
    error,
  } = useYoutubeQuery(['music'], (youtube) => youtube.playlistitem());

  if (isLoading) {
    return <Loading />;
  }

  if (error || !playlist) {
    return <NotFound />;
  }

  return (
    <section id='playlist'>
      <p className='text-xl sm:text-lg text-white mb-3'>⚡TOP MUSIC</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Swiper
          slidesPerView={1} // 기본값을 1로 설정
          spaceBetween={15}
          navigation={true}
          autoplay={{
            delay: 20000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1200: {
              slidesPerView: 3, // 화면 너비가 800px 이상일 때 slidesPerView를 2로 설정
            },
            600: {
              slidesPerView: 2, // 화면 너비가 800px 이상일 때 slidesPerView를 2로 설정
            },
          }}
          modules={[Navigation, Autoplay]}
          className='mySwiper'
        >
          {playlist &&
            playlist?.items.map((item, index) => (
              <SwiperSlide key={index}>
                <ListItemCard video={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
