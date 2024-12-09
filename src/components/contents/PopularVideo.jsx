import { useInfiniteQuery } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import Loading from './Loading';
import NotFound from './NotFound';
import VideoCard from './VideoCard';

export default function PopularVideo() {
  const { youtube } = useYoutubeApi();
  const {
    data: popularVideo,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['popularVideo'],
    queryFn: async ({ pageParam = '' }) => {
      const result = await youtube.mostPopular(pageParam);
      return {
        items: result.items,
        nextPageToken: result.nextPageToken,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
  });
  return (
    <section className='mt-3'>
      {isLoading && <Loading />}
      {error && <NotFound />}
      {popularVideo && (
        <ul className='grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-5 videoCard'>
          {popularVideo.pages.map((page, i) =>
            page.items.map((video, index) => (
              <VideoCard key={`${i}-${index}`} video={video} />
            ))
          )}
        </ul>
      )}
      <div className='video__more'>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : '더보기'}
          </button>
        )}
      </div>
    </section>
  );
}
