import { useInfiniteQuery } from '@tanstack/react-query';
import VideoCard from 'components/contents/VideoCard';
import { useYoutubeApi } from 'context/YoutubeApiContext';

export default function RelatedVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const {
    data: videos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['related', id],
    queryFn: async ({ pageParam = '' }) => {
      const result = await youtube.relatedVideos(id, pageParam);
      return {
        items: result.items,
        nextPageToken: result.nextPageToken,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <ul>
        {videos?.pages?.map((page, pageIndex) =>
          page.items.map((video) => (
            <VideoCard
              key={`${video.id}-${pageIndex}`}
              video={video}
              type='list'
            />
          ))
        )}
      </ul>
      {hasNextPage && (
        <div className='video__more'>
          <button
            className='relatedBtn'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : '더보기'}
          </button>
        </div>
      )}
    </>
  );
}
