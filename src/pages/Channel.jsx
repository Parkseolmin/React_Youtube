import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from 'components/contents/Loading';
import NotFound from 'components/contents/NotFound';
import VideoCard from 'components/contents/VideoCard';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { useParams } from 'react-router-dom';
import { formatNumber } from 'util/number';

export default function Channel() {
  const { youtube } = useYoutubeApi();
  const { channelId } = useParams();
  const fetchChannelData = async ({ pageParam = '' }) => {
    const [channelImageData, relatedVideosData] = await Promise.all([
      youtube.channelImageURL(channelId),
      youtube.relatedVideos(channelId, pageParam),
    ]);

    return {
      channelImage: channelImageData, // 예를 들어, URL 정보만 추출
      relatedVideos: relatedVideosData, // 예를 들어, 비디오 목록만 추출
      nextPageToken: relatedVideosData.nextPageToken, // 다음 페이지 요청을 위한 토큰
    };
  };

  const {
    data: channelPage,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['channelPage', channelId],
    queryFn: fetchChannelData,
    getNextPageParam: (lastPage) => lastPage?.nextPageToken || undefined,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !channelPage) {
    return <NotFound />;
  }

  const firstPage = channelPage.pages?.[0];
  const channelImage = firstPage?.channelImage;
  const relatedVideos = firstPage?.relatedVideos;

  const { bannerExternalUrl } = channelImage?.brandingSettings?.image || {};
  const { title, description } = channelImage?.snippet || {};
  const { url } = channelImage?.snippet?.thumbnails?.high || {};
  const { subscriberCount, videoCount, viewCount } =
    channelImage?.statistics || {};
  console.log('relatedVideos', relatedVideos);
  console.log('url', url);

  return (
    <section id='channel'>
      {channelPage.pages && (
        <div className='channel__inner'>
          <div
            className='channel__header'
            style={{
              backgroundImage: `url(${bannerExternalUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='circle'>
              <img src={url} alt={title} />
            </div>
          </div>
          <div className='channel__info'>
            <h3 className='title'>{title}</h3>
            <p className='desc'>{description}</p>
            <div className='info'>
              <span>
                구독자 : {formatNumber(subscriberCount ?? '')}
                만명
              </span>
              <span>영상 : {formatNumber(videoCount)}만개</span>
              <span>시청횟수 : {formatNumber(viewCount)}만번</span>
            </div>
          </div>

          <div className='mt-5 rounded-3xl grid grid-cols-1 p-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-5 videoCard'>
            {channelPage.pages.map((page) =>
              page.relatedVideos.items.map((video) => (
                <ul key={video.id}>
                  <VideoCard video={video} />
                </ul>
              ))
            )}
          </div>
          {hasNextPage && (
            <div className='video__more '>
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading more...' : '더보기'}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
