import PopularVideo from 'components/contents/PopularVideo';
import ShortsVideo from 'components/contents/ShortsVideo';
import Stramers from 'components/contents/Stramers';
import Today from 'components/contents/Today';

export default function Home() {
  return (
    <section>
      <Today />
      <Stramers />
      <PopularVideo />
      <ShortsVideo />
    </section>
  );
}
