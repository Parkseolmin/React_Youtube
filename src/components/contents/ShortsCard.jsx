import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'util/date';

export default function ShortsCard({ video, type }) {
  const navigate = useNavigate();
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const isList = type === 'list';
  const handleClick = () => {
    navigate(`/video/${video.id}`, { state: { video } });
  };
  return (
    <li
      className={isList ? 'flex gap-1 mx-2 mb-2  relativeVideo' : ''}
      onClick={handleClick}
    >
      <img
        className={
          isList
            ? 'w-60 mr-2 play__icon rounded-md'
            : 'w-full play__icon rounded-lg'
        }
        src={thumbnails.high.url}
        alt={title}
      />
      <div>
        <p className='text-sm VideoCard__title font-semibold my-2 line-clamp-2 text-slate-200'>
          {title}
        </p>

        <p className='text-xs  my-0'>{channelTitle}</p>
        <p className='text-xs my-0'>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}
