import Loading from './Loading';
import NotFound from './NotFound';
import { formatAgo } from 'util/date';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function Comments({ videoId }) {
  const { youtube } = useYoutubeApi();
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['comments', videoId],
    queryFn: async ({ pageParam = '' }) => {
      return youtube.commentsAPI(videoId, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
  });
  // const {
  //   data: comments,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading,
  //   error,
  // } = useYoutubeInfiniteQuery(['comments', videoId], (youtube, pageParam) =>
  //   youtube.commentsAPI(videoId, pageParam)
  // );
  if (isLoading) {
    return <Loading />;
  }

  if (error || !comments) {
    return <NotFound />;
  }

  // HTML 태그 제거 함수
  const stripHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, '');
  };

  console.log('comments', comments);
  return (
    <div className='sm:p-3 lg:p-5 '>
      <h2>댓글</h2>
      {comments && (
        <ul>
          {comments.pages.map((page, pageIndex) =>
            page.items.map((item) => (
              <li
                key={`${pageIndex}-${item.id}`}
                className='flex gap-2 line-clamp-2 mt-3'
              >
                <img
                  className='w-6 h-6 rounded-full'
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt='profileimage'
                />
                <div className='flex flex-col'>
                  <span className='flex gap-3 items-center'>
                    <p className='text-sm opacity-85 mb-2'>
                      {item.snippet.topLevelComment.snippet.authorDisplayName}
                    </p>
                    <p className='text-xs opacity-75'>
                      {formatAgo(
                        item.snippet.topLevelComment.snippet.publishedAt
                      )}
                    </p>
                  </span>
                  <span>
                    {stripHtmlTags(
                      item.snippet.topLevelComment.snippet.textDisplay
                    )}
                  </span>
                </div>
              </li>
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
    </div>
  );
}
