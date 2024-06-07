import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import Loading from './Loading';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';
import { useYoutubeQuery } from 'hooks/useQuery';

export default function ChannelInfo({ channelId, name }) {
  const { youtube } = useYoutubeApi();
  // const {
  //   data: channelInfo,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['channel', channelId],
  //   queryFn: () => youtube.channelImageURL(channelId),
  //   staleTime: 1000 * 60 * 5,
  // });

  const {
    data: channelInfo,
    isLoading,
    error,
  } = useYoutubeQuery(['channel', channelId], (youtube) =>
    youtube.channelImageURL(channelId)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error || !channelInfo) {
    return <NotFound />;
  }
  console.log('channelId>>', channelId);
  return (
    <div className='flex my-4 mb-8 items-center'>
      {channelInfo && (
        <Link to={`/channel/${channelId}`}>
          <img
            className='w-20 h-20 rounded-full'
            src={channelInfo?.snippet?.thumbnails?.default?.url ?? ''}
            alt={channelInfo?.snippet?.title ?? ''}
          />
        </Link>
      )}
      <p className='text-xl font-medium ml-2'>{name}</p>
    </div>
  );
}
