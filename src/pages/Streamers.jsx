import { streamers } from 'data/Streamers';
import { Link } from 'react-router-dom';

export default function Streamers() {
  return (
    <section className='p-10'>
      <h2>⚡파지직 스트리머를 소개합니다</h2>
      <div className='streamers__inner '>
        {streamers.map((streamer, index) => {
          return (
            <div className='streamer' key={index}>
              <div className='streamer__img play__icon'>
                <Link to={`/channel/${streamer.channelId}`}>
                  <img src={streamer.img} alt={streamer.name} />
                </Link>
              </div>
              <div className='streamer__info'>
                <Link to={`/channel/${streamer.channelId}`}>
                  {streamer.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
