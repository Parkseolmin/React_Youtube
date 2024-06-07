import ChannelInfo from 'components/contents/ChannelInfo';
import Comments from 'components/contents/Comments';
import { useLocation, useParams } from 'react-router-dom';
import RelatedVideos from './RelatedVideos';
import { formatAgo } from './../util/date';
import { useEffect } from 'react';
import lazyload from 'vanilla-lazyload';

export default function VideoDetail() {
  useEffect(() => {
    new lazyload();
  }, []);
  const { videoId } = useParams();
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description, publishedAt } =
    video.snippet;

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          className='lazy rounded-lg'
          style={{ border: 'none' }}
          title={title}
          id='player'
          type='text/html'
          width='100%'
          height='640'
          data-src={`http://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          src={`http://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          allow='autoplay; encrypted-media'
          loading='lazy'
        ></iframe>
        <div className='p-8'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <div className='flex justify-between items-center'>
            <ChannelInfo channelId={channelId} name={channelTitle} />
            <span>{formatAgo(publishedAt)}</span>
          </div>
          <details className='whitespace-pre-wrap'>
            <summary>비디오 내용 더보기</summary>
            {description}
          </details>
        </div>
        <div>
          <Comments videoId={videoId} />
        </div>
      </article>
      <div className='basis-2/6'>
        <RelatedVideos id={channelId} />
      </div>
    </section>
  );
}
