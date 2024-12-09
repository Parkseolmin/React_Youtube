import React, { useMemo, useState, memo } from 'react';
import TodayCard from 'components/contents/TodayCard';
import Loading from 'components/contents/Loading';
import NotFound from 'components/contents/NotFound';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Virtual } from 'swiper/modules'; // Virtual 모듈로 대체
import 'swiper/css'; // Swiper 기본 CSS
import 'swiper/css/navigation'; // Navigation 모듈 CSS
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

// 최적화된 TodayCard
const MemoizedTodayCard = memo(
  ({ video }) => <TodayCard video={video} />,
  (prevProps, nextProps) => prevProps.video.id === nextProps.video.id
);

const Today = memo(() => {
  const { searchId } = useParams();
  const { youtube } = useYoutubeApi();

  // React Query로 데이터 가져오기
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['videos', searchId],
    queryFn: async () => {
      const result = await youtube.search(searchId);
      return {
        items: result.items,
      };
    },
  });

  // 현재 슬라이드 인덱스를 상태로 관리
  const [activeIndex, setActiveIndex] = useState(0);

  // Swiper 설정을 useMemo로 캐싱
  const swiperConfig = useMemo(
    () => ({
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: true,
      autoplay: {
        delay: 20000,
        disableOnInteraction: false,
      },
      virtual: true, // Virtual 모듈 활성화
      breakpoints: {
        1200: {
          slidesPerView: 2,
        },
      },
      modules: [Navigation, Autoplay, Virtual], // Virtual 모듈 추가
    }),
    []
  );

  // 슬라이드 콘텐츠를 useMemo로 관리
  const slides = useMemo(() => {
    if (!videos?.items) {
      return [];
    }

    return videos.items.map((item, index) => (
      <SwiperSlide key={item.id} virtualIndex={index}>
        {/* 현재 슬라이드 ±2 범위의 슬라이드만 렌더링 */}
        {index >= activeIndex - 2 && index <= activeIndex + 2 ? (
          <MemoizedTodayCard video={item} />
        ) : (
          <div style={{ height: 200 }}>로딩 중...</div> // Placeholder
        )}
      </SwiperSlide>
    ));
  }, [videos?.items, activeIndex]);

  // 로딩 상태 처리
  if (isLoading) {
    return <Loading />;
  }

  // 에러 또는 데이터 없음 처리
  if (error || !videos) {
    return <NotFound />;
  }

  return (
    <section id='today'>
      {/* 제목 영역 */}
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

      {/* 슬라이드 영역 */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Swiper
          {...swiperConfig}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // 슬라이드 변경 시 상태 업데이트
          className='mySwiper'
        >
          {slides}
        </Swiper>
      </div>
    </section>
  );
});

export default Today;
