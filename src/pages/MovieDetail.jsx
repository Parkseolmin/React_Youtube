import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'components/contents/Loading';
import NotFound from 'components/contents/NotFound';
import { useYoutubeInfiniteQuery } from 'hooks/useQuery';
import VideoCard from 'components/contents/VideoCard';
import lazyload from 'vanilla-lazyload';

export default function MovieDetail() {
  useEffect(() => {
    lazyloadInstance = new lazyload();
  }, []);
  let lazyloadInstance;
  const { listId } = useParams();
  const {
    data: playlistItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useYoutubeInfiniteQuery(['playlistItems', listId], (youtube, pageParam) =>
    youtube.listitem(listId, pageParam)
  );

  const [selectedVideo, setSelectedVideo] = useState(null);

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  // 첫 번째 playlistItem을 가져오기
  const firstItem = playlistItems?.pages[0]?.items[0];
  const currentVideo = selectedVideo || firstItem;

  return (
    <section className='movieDetail__container'>
      {currentVideo && (
        <section style={{ textAlign: 'center' }}>
          <h2>{currentVideo.snippet.title}</h2>
          <iframe
            className='lazy movieDetail'
            data-src={`https://www.youtube-nocookie.com/embed/${currentVideo.snippet.resourceId.videoId}?autoplay=1&mute=1`}
            width='80%'
            height='540'
            src={`https://www.youtube-nocookie.com/embed/${currentVideo.snippet.resourceId.videoId}?autoplay=1&mute=1`}
            title={currentVideo.snippet.title}
            style={{ border: 'none', margin: '0 auto' }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </section>
      )}
      <section>
        <h2>Playlist Items</h2>
        <ul className='grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-5 videoCard'>
          {playlistItems.pages.map((page) =>
            page.items.map((item) => (
              <VideoCard
                key={item.id}
                video={item}
                onClick={() => setSelectedVideo(item)}
              />
            ))
          )}
        </ul>
        <div className='video__more'>
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load More'}
            </button>
          )}
        </div>
      </section>
    </section>
  );
}
