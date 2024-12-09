import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from 'components/contents/Loading';
import NotFound from 'components/contents/NotFound';
import VideoCard from 'components/contents/VideoCard';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { useParams } from 'react-router-dom';

export default function Search() {
  const { searchId } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['videos', searchId],
    queryFn: async ({ pageParam = '' }) => {
      const result = await youtube.search(searchId, pageParam);
      return {
        items: result.items,
        nextPageToken: result.nextPageToken,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
  });

  return (
    <>
      <div className='p-5 font-bold'>
        Videos {searchId ? `👓${searchId}` : '🔥'}
      </div>
      {isLoading && <Loading />}
      {error && <NotFound />}
      {videos && (
        <ul className='grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-5 videoCard'>
          {videos.pages.map((page, i) =>
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
    </>
  );
}
