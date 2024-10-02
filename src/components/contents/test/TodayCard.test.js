import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import TodayCard from '../TodayCard';
import { fakevideo as video } from 'test/videos';
import { formatAgo } from 'util/date';

const { thumbnails, title, channelTitle, publishedAt, channelId } =
  video.snippet;

describe('TodayCard Component Test', () => {
  describe('정적 테스트', () => {
    it('renders static content correctly', () => {
      render(
        <MemoryRouter>
          <TodayCard video={video} />
        </MemoryRouter>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', thumbnails.maxres.url);
      expect(image).toHaveAttribute('alt', title);
      expect(screen.getByText('today!')).toBeInTheDocument();
      expect(screen.getByText(channelTitle)).toBeInTheDocument();
      expect(
        screen.getByText(formatAgo(publishedAt, 'ko'))
      ).toBeInTheDocument();
    });
  });

  describe('Snapshot 테스트', () => {
    it('matches snapshot when playitem is not provided', () => {
      const { asFragment } = render(
        <MemoryRouter>
          <TodayCard video={video} />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot when playitem is provided', () => {
      const { asFragment } = render(
        <MemoryRouter>
          <TodayCard video={video} playitem='something' />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('onClick navigation 테스트', () => {
    it('navigates correctly when the first handleClick is triggered', () => {
      function LocationStateDisplay() {
        return <pre>{JSON.stringify(useLocation().state)}</pre>;
      }

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<TodayCard video={video} />} />
            <Route
              path={`/video/${video.id}`}
              element={<LocationStateDisplay />}
            />
          </Routes>
        </MemoryRouter>
      );

      const card = screen.getByTestId('handleClickFitst');
      fireEvent.click(card); // 클릭 이벤트 발생

      expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
    });

    it('navigates correctly when the second handleClick is triggered', () => {
      function LocationStateDisplay() {
        return <pre>{JSON.stringify(useLocation().state)}</pre>;
      }

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path='/'
              element={<TodayCard video={video} playitem='value' />}
            />
            <Route
              path={`/video/${video.snippet.resourceId.videoId}`}
              element={<LocationStateDisplay />}
            />
          </Routes>
        </MemoryRouter>
      );
      const card = screen.getByTestId('handleClickSecond');
      fireEvent.click(card);

      expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
    });
  });
});
