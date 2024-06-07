import axios from 'axios';

export class Youtube {
  constructor() {
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

  async search(keyword, pageToken = '') {
    return keyword
      ? this.#searchByKeyword(keyword, pageToken)
      : this.mostPopular(pageToken);
  }

  async #searchByKeyword(keyword, pageToken) {
    return this.httpClient
      .get('search', {
        params: {
          q: keyword,
          type: 'video',
          order: 'relevance',
          pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
        nextPageToken: res.data.nextPageToken,
      }));
  }

  async mostPopular(pageToken) {
    return this.httpClient
      .get('videos', {
        params: {
          chart: 'mostPopular',
          order: 'viewCount',
          pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items,
        nextPageToken: res.data.nextPageToken,
      }));
  }

  async shorts(pageToken) {
    return this.httpClient
      .get('search', {
        params: {
          p: 'shorts',
          relevanceLanguage: 'ko',
          regionCode: 'KR',
          pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
        nextPageToken: res.data.nextPageToken,
      }));
  }

  async liveVideos() {
    return this.httpClient
      .get('search', {
        params: {
          eventType: 'live',
          type: 'video',
          location: '37.5665,126.9780',
          locationRadius: '100km',
        },
      })
      .then((res) => ({
        items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
        nextPageToken: res.data.nextPageToken,
      }));
  }

  async channelImageURL(id) {
    return this.httpClient
      .get('channels', {
        params: {
          part: 'snippet, statistics, brandingSettings',
          id,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async relatedVideos(channelId, pageToken = '') {
    return this.httpClient
      .get('search', {
        params: {
          channelId,
          type: 'video',
          pageToken: pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
        nextPageToken: res.data.nextPageToken,
      }));
  }

  async commentsAPI(videoId, pageToken = '') {
    const res = await this.httpClient('commentThreads', {
      params: {
        videoId: videoId,
        maxResults: 20,
        pageToken: pageToken,
      },
    });
    return {
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    };
  }

  // PlayList.page
  async playlistitem() {
    return axios.get('/videos/playlist.json').then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }
  // Movie.page
  async latestmovie() {
    return axios.get('/videos/latestmovie.json').then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }

  async movielist(pageToken = '') {
    return this.httpClient
      .get('playlists', {
        params: {
          part: 'snippet, contentDetails',
          channelId: 'UCiEEF51uRAeZeCo8CJFhGWw',
          type: 'video',
          pageToken: pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items,
        nextPageToken: res.data.nextPageToken,
      }));
  }
  async musiclist(pageToken = '') {
    return this.httpClient
      .get('playlists', {
        params: {
          part: 'snippet, contentDetails',
          channelId: 'UC_Pkv1iQ7e4n2iQpdNssPug',
          type: 'video',
          pageToken: pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items,
        nextPageToken: res.data.nextPageToken,
      }));
  }

  async listitem(playlistId, pageToken = '') {
    return this.httpClient
      .get('playlistItems', {
        params: {
          playlistId,
          type: 'video',
          pageToken: pageToken,
        },
      })
      .then((res) => ({
        items: res.data.items,
        nextPageToken: res.data.nextPageToken,
      }));
  }
}
