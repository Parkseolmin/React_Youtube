import ChannelInfo from 'components/contents/ChannelInfo';
import Comments from 'components/contents/Comments';
import { useLocation, useParams } from 'react-router-dom';
import RelatedVideos from './RelatedVideos';
import { formatAgo } from './../util/date';
import { useEffect, useState } from 'react';
import lazyload from 'vanilla-lazyload';
import { FaRegKissWinkHeart, FaKissWinkHeart } from 'react-icons/fa';
import useAuthStore from 'store/useAuthStore';
import useLikeStore from 'store/useLikeStore';
import LazyLoad from 'vanilla-lazyload';

export default function VideoDetail() {
  const { videoId } = useParams();
  const {
    state: { video },
  } = useLocation();
  const { user } = useAuthStore();
  const { likedVideos, checkLikeStatus, toggleLike } = useLikeStore();
  console.log(JSON.stringify(likedVideos));

  const { title, channelId, channelTitle, description, publishedAt } =
    video.snippet;

  useEffect(() => {
    new LazyLoad({
      elements_selector: '.lazy',
    });
    if (user) {
      checkLikeStatus(user.uid, videoId);
    }
  }, [checkLikeStatus, user, videoId]);

  const handleLike = () => {
    if (user) {
      toggleLike(user.uid, videoId, video);
    }
  };
  const isLiked = likedVideos[videoId];

  console.log('받은 비디오 데이터값:', video);
  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          className='lazy rounded-lg'
          data-src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1`}
          width='100%'
          height='640'
          src='' // 비워둡니다.
          title={title}
          style={{ border: 'none' }}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
        <div className='p-8'>
          <h2 className='text-xl font-bold flex justify-between flex-col items-start gap-3'>
            <span>{title}</span>
            {user && (
              <button
                className={
                  'flex items-center gap-2 bg-customGreen p-1.5 rounded-md goodBtn'
                }
                onClick={handleLike}
              >
                <span>좋아요</span>
                {isLiked ? <FaKissWinkHeart /> : <FaRegKissWinkHeart />}
              </button>
            )}
          </h2>
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
