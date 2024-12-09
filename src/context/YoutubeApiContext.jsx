import { createContext, useContext } from 'react';
import { youtubeInstance } from './youtubeInstance/youtubeInstance';

export const YoutubeApiContext = createContext();

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube: youtubeInstance }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
