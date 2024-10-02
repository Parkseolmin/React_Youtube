import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { default as ShortsCard } from '../ShortsCard';
import { fakevideo as video } from 'test/videos';

describe('ShortsCard Test', () => {
  it('renders grid type correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ShortsCard video={video} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders list type correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ShortsCard video={video} type='list' />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('navigates to detailed video page with video state when clicked', () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<ShortsCard video={video} />} />
          <Route
            path={`/video/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </Routes>
      </MemoryRouter>
    );

    const card = screen.getByRole('listitem');
    fireEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
