import { useNavigate } from 'react-router-dom';
import { formatAgo } from 'util/date';
import { LuListVideo } from 'react-icons/lu';

export default function MovieCard({ video, type }) {
  const navigate = useNavigate();
  const { itemCount } = video.contentDetails;
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const isList = type === 'list';
  return (
    <li
      className={isList ? 'flex gap-1 mx-2 mb-2  relativeVideo' : ''}
      onClick={() => {
        navigate(`/movies/${video.id}`, { state: { video } });
      }}
    >
      <img
        className={
          isList
            ? 'w-60 mr-2 play__icon rounded-md'
            : 'w-full play__icon rounded-lg'
        }
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p className='flex items-center'>
          <LuListVideo />
          동영상 : {itemCount}개
        </p>
        <p className='text-sm VideoCard__title font-semibold my-2 line-clamp-2 text-slate-200'>
          {title}
        </p>
        <p className='text-xs  my-0'>{channelTitle}</p>
        <p className='text-xs my-0'>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}
