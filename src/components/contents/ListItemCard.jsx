import { Link, useNavigate } from 'react-router-dom';

export default function ListItemCard({ video, playitem = '' }) {
  const navigate = useNavigate();
  const { thumbnails, title, channelId } = video.snippet;
  const handleClick = () => {
    navigate(`/video/${video.snippet.resourceId.videoId}`, {
      state: { video },
    });
  };
  return (
    <>
      <div className='today__inner rounded-lg' onClick={handleClick}>
        <div className='today__thumb play__icon'>
          <img src={thumbnails?.maxres?.url} alt={title} />
        </div>
      </div>
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
    </>
  );
}
