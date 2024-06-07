import MovielistItem from 'components/contents/MovielistItem';
import Netflexlist from 'components/contents/Netflexlist';

export default function Movies() {
  return (
    <section>
      <div className='bgContainer'>
        <div className='overlay'>
          <video src='/video/movies.mp4' autoPlay loop muted />
          <MovielistItem />
        </div>
      </div>
      <Netflexlist />
    </section>
  );
}
