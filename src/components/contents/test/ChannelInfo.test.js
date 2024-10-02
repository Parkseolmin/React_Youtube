import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import ChannelInfo from '../ChannelInfo'; // 실제 경로에 맞게 수정
import { MemoryRouter } from 'react-router-dom';

// youtube API 모킹
jest.mock('context/YoutubeApiContext');

// QueryClient 생성 함수
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 재시도 방지
      },
    },
  });

describe('ChannelInfo Test', () => {
  const mockYoutube = {
    channelImageURL: jest.fn(),
  };

  beforeEach(() => {
    useYoutubeApi.mockReturnValue({ youtube: mockYoutube });
  });

  it('스냅샷 테스트', async () => {
    const mockUrl = 'https://example.com/channel-image.jpg';
    mockYoutube.channelImageURL.mockResolvedValue(mockUrl); // channelInfo가 직접 URL임

    const { asFragment } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <ChannelInfo channelId='123' name='Test Channel' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // 비동기 작업이 완료될 때까지 기다립니다.
    await waitFor(() => {
      expect(screen.getByAltText('Test Channel')).toBeInTheDocument();
    });

    // 스냅샷을 찍습니다.
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders channel image correctly', async () => {
    const mockUrl = 'https://example.com/channel-image.jpg';
    mockYoutube.channelImageURL.mockResolvedValue(mockUrl); // channelInfo가 직접 URL임

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <ChannelInfo channelId='123' name='Test Channel' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // 이미지가 올바르게 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByRole('img')).toHaveAttribute('src', mockUrl);
    });

    // 이름이 제대로 표시되는지 확인
    expect(screen.getByText('Test Channel')).toBeInTheDocument();
  });

  it('renders NotFound when there is an error', async () => {
    mockYoutube.channelImageURL.mockImplementationOnce(() => {
      throw new Error('Error fetching channel info');
    });

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <ChannelInfo channelId='123' name='Error Channel' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // NotFound 컴포넌트가 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText(/여기는 어떻게 오셨나요?/i)).toBeInTheDocument();
    });
  });

  it('renders Loading state initially', async () => {
    mockYoutube.channelImageURL.mockReturnValue(new Promise(() => {})); // 대기 중 상태

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <ChannelInfo channelId='123' name='Loading Channel' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Loading 컴포넌트가 렌더링되는지 확인
    expect(screen.getByText(/로딩 중.../i)).toBeInTheDocument();
  });
});
