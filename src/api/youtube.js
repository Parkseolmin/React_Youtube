import axios from 'axios';

/**
 * Youtube class for handling YouTube Data API requests.
 */
export class Youtube {
  /**
   * Constructor for creating a new instance of the Youtube class.
   * Sets up an instance of axios for making HTTP requests.
   */
  constructor() {
    // Create an axios instance with baseURL and common params
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        part: 'snippet',
        maxResults: 10,
        regionCode: 'KR',
      },
    });
  }

  /**
   * Searches for videos based on a keyword.
   * @param {string} keyword - The search keyword.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async search(keyword, pageToken = '') {
    try {
      if (keyword) {
        return await this.#searchByKeyword(keyword, pageToken);
      } else {
        return await this.mostPopular(pageToken);
      }
    } catch (error) {
      console.error('Error in search:', error);
      throw error;
    }
  }

  /**
   * Private method for searching videos by keyword.
   * @private
   * @param {string} keyword - The search keyword.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async #searchByKeyword(keyword, pageToken) {
    try {
      const response = await this.httpClient.get('search', {
        params: {
          q: keyword,
          type: 'video',
          order: 'relevance',
          pageToken,
        },
      });
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in #searchByKeyword:', error);
      throw error;
    }
  }

  /**
   * Retrieves the most popular videos.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async mostPopular(pageToken) {
    try {
      const response = await this.httpClient.get('videos', {
        params: {
          chart: 'mostPopular',
          order: 'viewCount',
          pageToken,
        },
      });
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in mostPopular:', error);
      throw error;
    }
  }

  /**
   * Searches for YouTube shorts.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async shorts(pageToken) {
    try {
      const response = await this.httpClient.get('search', {
        params: {
          p: 'shorts',
          relevanceLanguage: 'ko',
          regionCode: 'KR',
          order: 'date',
          pageToken,
        },
      });
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in shorts:', error);
      throw error;
    }
  }

  /**
   * Retrieves live YouTube videos.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async liveVideos() {
    try {
      const response = await this.httpClient.get('search', {
        params: {
          eventType: 'live',
          type: 'video',
          location: '37.5665,126.9780',
          locationRadius: '100km',
        },
      });
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in liveVideos:', error);
      throw error;
    }
  }

  /**
   * Retrieves channel image URL.
   * @param {string} id - The channel ID.
   * @returns {Promise<object>} The channel item object.
   */
  async channelImageURL(id) {
    try {
      const response = await this.httpClient.get('channels', {
        params: {
          part: 'snippet, statistics, brandingSettings',
          id,
        },
      });
      return response.data.items[0];
    } catch (error) {
      console.error('Error in channelImageURL:', error);
      throw error;
    }
  }

  /**
   * Retrieves related videos based on a channel ID.
   * @param {string} channelId - The channel ID.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async relatedVideos(channelId, pageToken = '') {
    try {
      const response = await this.httpClient.get('search', {
        params: {
          channelId,
          type: 'video',
          pageToken,
        },
      });
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in relatedVideos:', error);
      throw error;
    }
  }

  /**
   * Retrieves video comments based on a video ID.
   * @param {string} videoId - The video ID.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async commentsAPI(videoId, pageToken = '') {
    try {
      const response = await this.httpClient.get('commentThreads', {
        params: {
          videoId,
          maxResults: 20,
          pageToken,
        },
      });
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in commentsAPI:', error);
      throw error;
    }
  }

  /**
   * Retrieves playlist items.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async playlistitem() {
    try {
      const response = await axios.get('/videos/playlist.json');
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.snippet.resourceId.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in playlistitem:', error);
      throw error;
    }
  }

  /**
   * Retrieves the latest movies.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async latestmovie() {
    try {
      const response = await axios.get('/videos/latestmovie.json');
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.snippet.resourceId.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in latestmovie:', error);
      throw error;
    }
  }

  /**
   * Retrieves movie lists.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async movielist(pageToken = '') {
    try {
      const response = await this.httpClient.get('playlists', {
        params: {
          part: 'snippet, contentDetails',
          channelId: 'UCiEEF51uRAeZeCo8CJFhGWw',
          type: 'video',
          pageToken,
        },
      });
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in movielist:', error);
      throw error;
    }
  }

  /**
   * Retrieves music lists.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async musiclist(pageToken = '') {
    try {
      const response = await this.httpClient.get('playlists', {
        params: {
          part: 'snippet, contentDetails',
          channelId: 'UC_Pkv1iQ7e4n2iQpdNssPug',
          type: 'video',
          pageToken,
        },
      });
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in musiclist:', error);
      throw error;
    }
  }

  /**
   * Retrieves playlist items.
   * @param {string} playlistId - The playlist ID.
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async listitem(playlistId, pageToken = '') {
    try {
      const response = await this.httpClient.get('playlistItems', {
        params: {
          playlistId,
          type: 'video',
          pageToken,
        },
      });
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.snippet.resourceId.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in listitem:', error);
      throw error;
    }
  }

  /**
   * Retrieves real YouTube subscription channel information
   * @param {string} accessToken
   * @param {string} pageToken - The page token for pagination.
   * @returns {Promise<object>} An object containing items and nextPageToken.
   */
  async fetchSubscriptions(accessToken, pageToken = '') {
    try {
      const response = await axios.get(
        'https://youtube.googleapis.com/youtube/v3/subscriptions',
        {
          params: {
            part: 'snippet',
            mine: true,
            maxResults: 10,
            pageToken,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('구독 정보 가져오기 실패:', error);
    }
  }
}
