import { Link, useNavigate } from 'react-router-dom';
import { formatAgo } from 'util/date';

export default function TodayCard({ video, playitem = '' }) {
  const navigate = useNavigate();
  const { thumbnails, title, channelTitle, publishedAt, channelId } =
    video.snippet;
  const handleClick = () => {
    if (playitem) {
      navigate(`/video/${video.snippet.resourceId.videoId}`, {
        state: { video },
      });
    } else {
      navigate(`/video/${video.id}`, { state: { video } });
    }
  };
  return (
    <>
      <div className='today__inner rounded-lg' onClick={handleClick}>
        <div className='today__thumb play__icon'>
          <img src={thumbnails?.maxres?.url} alt={title} />
        </div>

        {!playitem ? (
          <div className='today__text'>
            <span className='today'>today!</span>
            <div className='info'>
              <span className='author'>
                <Link to={`/channel/${channelId}`}>{channelTitle}</Link>
              </span>
              <span className='date'>{formatAgo(publishedAt)}</span>
            </div>
          </div>
        ) : (
          <div
            className='playlist'
            onClick={() => {
              navigate(`/video/${video.snippet.resourceId.videoId}`, {
                state: { video },
              });
            }}
          >
            <div className='playlist__item'>
              <span className='author'>
                <Link to={`/channel/${channelId}`} className='line-clamp-1'>
                  {title}
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
