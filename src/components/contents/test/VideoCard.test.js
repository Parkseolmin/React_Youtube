import { fireEvent, render, screen } from '@testing-library/react';
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import VideoCard from '../VideoCard';
import { fakevideo as video } from 'test/videos';
import { formatAgo } from 'util/date';

const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

describe('VideoCard Test', () => {
  describe('정적 테스트', () => {
    it('renders video items', () => {
      render(
        <MemoryRouter>
          <VideoCard video={video} />
        </MemoryRouter>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', thumbnails.medium.url);
      expect(image).toHaveAttribute('alt', title);
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(channelTitle)).toBeInTheDocument();
      expect(
        screen.getByText(formatAgo(publishedAt, 'ko'))
      ).toBeInTheDocument();
    });

    it('applies correct class when type is "list"', () => {
      render(
        <MemoryRouter>
          <VideoCard video={video} type='list' />
        </MemoryRouter>
      );
      const listitem = screen.getByRole('listitem');
      expect(listitem).toHaveClass('flex gap-1 mx-2 mb-2 relativeVideo');
    });

    it('applies correct class when type is not "list"', () => {
      render(
        <MemoryRouter>
          <VideoCard video={video} type='grid' />
        </MemoryRouter>
      );
      const listitem = screen.getByRole('listitem');
      expect(listitem).toHaveAttribute('class', '');
    });
  });

  describe('Snapshot 테스트', () => {
    it('renders list type correctly', () => {
      const { asFragment } = render(
        <MemoryRouter>
          <VideoCard video={video} type='list' />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('renders grid type correctly', () => {
      const { asFragment } = render(
        <MemoryRouter>
          <VideoCard video={video} />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  // onClick, navigate Test
  describe('onClick navigation 테스트', () => {
    // it('navigate 호출 여부 테스트', () => {
    //   const mockNavigate = jest.fn(); // 모킹 함수
    //   useNavigate.mockReturnValue(mockNavigate); // 모킹한 navigate를 반환

    //   render(
    //     <MemoryRouter>
    //       <VideoCard video={video} />
    //     </MemoryRouter>
    //   );

    //   const card = screen.getByRole('listitem');
    //   fireEvent.click(card);

    //   // navigate가 호출되었는지 확인
    //   expect(mockNavigate).toHaveBeenCalledWith(`/video/${video.id}`, {
    //     state: { video },
    //   });
    // });

    it('calls custom onClick handler when provided', () => {
      const onClickMock = jest.fn();
      render(
        <MemoryRouter>
          <VideoCard video={video} onClick={onClickMock} />
        </MemoryRouter>
      );

      const card = screen.getByRole('listitem');
      fireEvent.click(card);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('navigates to detailed video page with video state when clicked', () => {
      function LocationStateDisplay() {
        return <pre>{JSON.stringify(useLocation().state)}</pre>;
      }

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<VideoCard video={video} />} />
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
});
