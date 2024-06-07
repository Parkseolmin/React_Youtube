import { useInfiniteQuery } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import Loading from './Loading';
import NotFound from './NotFound';
import ShortsCard from './ShortsCard';

export default function ShortsVideo() {
  const { youtube } = useYoutubeApi();
  const {
    data: shortsVdieo,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['shortsVdieo'],
    queryFn: async ({ pageParam = '' }) => {
      const result = await youtube.shorts(pageParam);
      return {
        items: result.items,
        nextPageToken: result.nextPageToken,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <section className='mt-3'>
      <div className='flex ps-3 items-center gap-2'>
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
        <p className='text-xl sm:text-lg text-white'>Shorts</p>
      </div>
      {isLoading && <Loading />}
      {error && <NotFound />}
      {shortsVdieo && (
        <ul className='grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-5 videoCard'>
          {shortsVdieo.pages.map((page, i) =>
            page.items.map((video, index) => (
              <ShortsCard key={`${i}-${index}`} video={video} />
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
