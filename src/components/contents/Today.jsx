import TodayCard from 'components/contents/TodayCard';
import Loading from 'components/contents/Loading';
import NotFound from 'components/contents/NotFound';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useYoutubeQuery } from 'hooks/useQuery';

export default function Today() {
  const { searchId } = useParams();
  // const { youtube } = useYoutubeApi();
  // const {
  //   data: videos,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['videos', searchId],
  //   queryFn: async () => {
  //     const result = await youtube.search(searchId);
  //     return {
  //       items: result.items,
  //     };
  //   },
  // });
  const {
    data: videos,
    isLoading,
    error,
  } = useYoutubeQuery(['videos', searchId], (youtube) =>
    youtube.search(searchId)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error || !videos) {
    return <NotFound />;
  }
  return (
    <>
      <section id='today'>
        <p className='text-xl sm:text-lg text-white mb-3'>⚡오늘의 추천 영상</p>
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
                slidesPerView: 2, // 화면 너비가 800px 이상일 때 slidesPerView를 2로 설정
              },
            }}
            modules={[Navigation, Autoplay]}
            className='mySwiper'
          >
            {videos &&
              videos?.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <TodayCard video={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
