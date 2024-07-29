import { useYoutubeInfiniteQuery } from 'hooks/useQuery';
import Loading from './Loading';
import NotFound from './NotFound';
import MovieCard from './MovieCard';

export default function Netflexlist() {
  const {
    data: netflexlist,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useYoutubeInfiniteQuery(['netflexlist'], (youtube, pageToken) =>
    youtube.movielist(pageToken)
  );

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <section>
      <p className='text-xl sm:text-lg px-4'>⚡Playlists</p>
      {netflexlist && (
        <ul className='grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-5 videoCard'>
          {netflexlist.pages.map((page, i) =>
            page.items.map((playlist, index) => (
              <MovieCard key={`${i}-${index}`} video={playlist} />
            ))
          )}
        </ul>
      )}

      <div className='video__more'>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}
      </div>
    </section>
  );
}
