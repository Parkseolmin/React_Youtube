import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'asset/scss/style.scss';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { YoutubeApiProvider } from 'context/YoutubeApiContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      onError: (error) => console.error('Query Error:', error),
      onSuccess: (data) => console.log('Query Success:', data),
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <YoutubeApiProvider>
        <App />
      </YoutubeApiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
