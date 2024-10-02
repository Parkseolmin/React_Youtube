import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';
import { MemoryRouter } from 'react-router-dom';
import Comments from '../Comments';

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

describe('Comments Component', () => {
  const mockYoutube = {
    commentsAPI: jest.fn(),
  };

  beforeEach(() => {
    useYoutubeApi.mockReturnValue({ youtube: mockYoutube });
  });

  it('renders loading state', () => {
    mockYoutube.commentsAPI.mockReturnValue(new Promise(() => {})); // 대기 중 상태

    const { asFragment } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <Comments videoId='123' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Loading 컴포넌트가 렌더링되는지 확인
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders NotFound when there is an error', async () => {
    mockYoutube.commentsAPI.mockRejectedValue(
      new Error('Error fetching comments')
    );

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <Comments videoId='123' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // NotFound 컴포넌트가 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText(/여기는 어떻게 오셨나요?/i)).toBeInTheDocument();
    });
  });

  it('renders comments correctly', async () => {
    const mockComments = {
      nextPageToken: 'next-token',
      items: [
        {
          id: '1',
          snippet: {
            topLevelComment: {
              snippet: {
                authorProfileImageUrl: 'https://example.com/image.jpg',
                authorDisplayName: 'John Doe',
                publishedAt: '2024-01-01T00:00:00Z',
                textDisplay: '<p>Hello, world!</p>',
              },
            },
          },
        },
      ],
    };

    mockYoutube.commentsAPI.mockResolvedValue({
      nextPageToken: 'next-token',
      items: mockComments.items,
    });

    const { asFragment } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <Comments videoId='123' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // 댓글이 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders more comments button when there are more comments', async () => {
    const mockComments = {
      nextPageToken: 'next-token',
      items: [
        {
          id: '1',
          snippet: {
            topLevelComment: {
              snippet: {
                authorProfileImageUrl: 'https://example.com/image.jpg',
                authorDisplayName: 'John Doe',
                publishedAt: '2024-01-01T00:00:00Z',
                textDisplay: '<p>Hello, world!</p>',
              },
            },
          },
        },
      ],
    };

    mockYoutube.commentsAPI.mockResolvedValue(mockComments);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter>
          <Comments videoId='123' />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // 더보기 버튼이 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText('더보기')).toBeInTheDocument();
    });
  });
});
