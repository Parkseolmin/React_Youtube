export const fakevideo = {
  id: 1,
  snippet: {
    title: 'title',
    channelId: '1',
    channelTitle: 'channel title',
    resourceId: {
      videoId: 11,
    },
    publishedAt: new Date(),
    thumbnails: {
      maxres: {
        url: 'https://www.youtube.com/',
      },
      high: {
        url: 'https://www.youtube.com/',
      },
      medium: {
        url: 'https://www.youtube.com/',
      },
    },
  },
};

export const fakevideos = [
  {
    id: 1,
    snippet: {
      title: 'title',
      channelId: '1',
      channelTitle: 'channel title',
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: 'https://www.youtube.com/',
        },
      },
    },
  },
  {
    id: 2,
    snippet: {
      title: 'title',
      channelId: '2',
      channelTitle: 'channel title2',
      publishedAt: new Date(),
      thumbnails: {
        medium: {
          url: 'https://www.youtube.com/2',
        },
      },
    },
  },
];
