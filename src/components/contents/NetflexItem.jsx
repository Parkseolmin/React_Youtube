import { useYoutubeInfiniteQuery } from 'hooks/useQuery';
import Loading from './Loading';
import NotFound from './NotFound';

export default function NetflexItem({ playlistId }) {
  const {
    data: playlistItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useYoutubeInfiniteQuery(
    ['netflexlistitem', playlistId],
    (youtube, pageParam) => youtube.netflexplayitem(playlistId, pageParam)
  );

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div>
      <h2>Playlist Items</h2>
      <ul>
        {playlistItems.pages.map((page) =>
          page.items.map((item) => <li key={item.id}>{item.snippet.title}</li>)
        )}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
