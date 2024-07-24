import TodayCard from 'components/contents/TodayCard';
import Loading from 'components/contents/Loading';
import NotFound from 'components/contents/NotFound';
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
          <p className='text-xl'>오늘의 추천 영상</p>
        </div>
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
