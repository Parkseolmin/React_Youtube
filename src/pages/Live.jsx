import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from 'components/contents/Loading';
import NotFound from 'components/contents/NotFound';
import VideoCard from 'components/contents/VideoCard';
import { useYoutubeApi } from 'context/YoutubeApiContext';

export default function Live() {
  const { youtube } = useYoutubeApi();
  const {
    data: liveVideos,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['liveVideos'],
    queryFn: async ({ pageParam = '' }) => {
      const result = await youtube.liveVideos(pageParam);
      return {
        items: result.items,
        nextPageToken: result.nextPageToken,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section>
      <div className='p-5 font-black text-lg text-red-700'>🔥LIVE</div>
      {isLoading && <Loading />}
      {error && <NotFound />}
      {liveVideos && (
        <ul className='grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-5 videoCard'>
          {liveVideos.pages.map((page, i) =>
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
