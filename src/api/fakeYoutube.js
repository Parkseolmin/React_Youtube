import axios from 'axios';

export class FakeYoutube {
  async search(keyword, nextToken = '') {
    return keyword
      ? this.#searchByKeyword(keyword, nextToken)
      : this.mostPopular();
  }

  async #searchByKeyword(keyword, nextToken = '') {
    return axios.get(`/videos/search.json`).then((res) => ({
      items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
      nextPageToken: res.data.nextPageToken,
    }));
  }

  async mostPopular() {
    return axios.get(`/videos/popular.json`).then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }

  async channelImageURL() {
    return axios
      .get('/videos/channelImg.json')
      .then((res) => res.data.items[0]);
  }

  async liveVideos() {
    return axios.get('/videos/live.json').then((res) => ({
      items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
      nextPageToken: res.data.nextPageToken,
    }));
  }

  async relatedVideos() {
    return axios.get('/videos/channelRelated.json').then((res) => ({
      items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
      nextPageToken: res.data.nextPageToken,
    }));
  }

  async commentsAPI(nextPageToken = '') {
    let url = '/videos/comments.json';
    if (nextPageToken) {
      url += `?pageToken=${nextPageToken}`;
    }
    return axios.get(url).then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }

  async shorts() {
    return axios.get('/videos/shorts.json').then((res) => ({
      items: res.data.items.map((item) => ({ ...item, id: item.id.videoId })),
      nextPageToken: res.data.nextPageToken,
    }));
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
  // netflex
  async movielist() {
    return axios.get('/videos/netflexlist.json').then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }
  async movieitem() {
    return axios.get('/videos/netflexitem.json').then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }
  // music
  async musiclist() {
    return axios.get('/videos/musiclist.json').then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }
  async musicitem() {
    return axios.get('/videos/musicitem.json').then((res) => ({
      items: res.data.items,
      nextPageToken: res.data.nextPageToken,
    }));
  }
}
