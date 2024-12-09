import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useYoutubeApi } from 'context/YoutubeApiContext';

export const useYoutubeQuery = (queryKey, queryFn, options = {}) => {
  const { youtube } = useYoutubeApi();

  return useQuery({
    queryKey,
    queryFn: () => queryFn(youtube),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useYoutubeInfiniteQuery = (queryKey, queryFn, options = {}) => {
  const { youtube } = useYoutubeApi();

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = '' }) => queryFn(youtube, pageParam),
    getNextPageParam: (lastPage) => lastPage?.nextPageToken ?? undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
};
