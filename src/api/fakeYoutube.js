import axios from 'axios';

export class FakeYoutube {
  async search(keyword, nextToken = '') {
    return keyword
      ? this.#searchByKeyword(keyword, nextToken)
      : this.mostPopular();
  }

  async #searchByKeyword(keyword, nextToken = '') {
    try {
      const response = await axios.get(`/videos/search.json`);
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in #searchByKeyword:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async mostPopular() {
    try {
      const response = await axios.get(`/videos/popular.json`);
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in mostPopular:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async channelImageURL() {
    try {
      const response = await axios.get('/videos/channelImg.json');
      return response.data.items[0];
    } catch (error) {
      console.error('Error in channelImageURL:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async liveVideos() {
    try {
      const response = await axios.get('/videos/live.json');
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in liveVideos:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async relatedVideos() {
    try {
      const response = await axios.get('/videos/channelRelated.json');
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in relatedVideos:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async commentsAPI(nextPageToken = '') {
    try {
      let url = '/videos/comments.json';
      if (nextPageToken) {
        url += `?pageToken=${nextPageToken}`;
      }
      const response = await axios.get(url);
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in commentsAPI:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async shorts() {
    try {
      const response = await axios.get('/videos/shorts.json');
      return {
        items: response.data.items.map((item) => ({
          ...item,
          id: item.id.videoId,
        })),
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in shorts:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async playlistitem() {
    try {
      const response = await axios.get('/videos/playlist.json');
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in playlistitem:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async latestmovie() {
    try {
      const response = await axios.get('/videos/latestmovie.json');
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in latestmovie:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async movielist() {
    try {
      const response = await axios.get('/videos/netflexlist.json');
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in movielist:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async movieitem() {
    try {
      const response = await axios.get('/videos/netflexitem.json');
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in movieitem:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async musiclist() {
    try {
      const response = await axios.get('/videos/musiclist.json');
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in musiclist:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async musicitem() {
    try {
      const response = await axios.get('/videos/musicitem.json');
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in musicitem:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }

  async fetchSubscriptions() {
    try {
      const response = await axios.get('/videos/subscription.json');
      return {
        items: response.data.items,
        nextPageToken: response.data.nextPageToken,
      };
    } catch (error) {
      console.error('Error in musicitem:', error);
      throw error; // 에러를 상위로 다시 던져 처리
    }
  }
}
