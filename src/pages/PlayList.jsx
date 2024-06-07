import Musiclist from 'components/contents/Musiclist';
import PlaylistItem from 'components/contents/PlaylistItem';

export default function PlayList() {
  return (
    <section>
      <div className='bgContainer'>
        <div className='overlay'>
          <video src='/video/playlist.mp4' autoPlay loop muted />
          <PlaylistItem />
        </div>
      </div>
      <Musiclist />
    </section>
  );
}
