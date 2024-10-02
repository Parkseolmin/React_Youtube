import { Outlet } from 'react-router-dom';
import SearchInput from './SearchInput';
import Footer from './Footer';
import Header from './Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from 'context/YoutubeApiContext';
import { ScrollTo } from 'util/scrollTo';

const queryClient = new QueryClient();

export default function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollTo />
      <YoutubeApiProvider>
        <Header />
        <main id='main' role='main'>
          <SearchInput />
          <Outlet />
        </main>
        <Footer />
      </YoutubeApiProvider>
    </QueryClientProvider>
  );
}
