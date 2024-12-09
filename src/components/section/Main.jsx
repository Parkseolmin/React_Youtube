import { Outlet } from 'react-router-dom';
import SearchInput from './SearchInput';
import Footer from './Footer';
import Header from './Header';
import { ScrollTo } from 'util/scrollTo';

export default function Main() {
  return (
    <>
      <ScrollTo />
      <Header />
      <main id='main' role='main'>
        <SearchInput />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
