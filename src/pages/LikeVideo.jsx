import Loading from 'components/contents/Loading';
import VideoCard from 'components/contents/VideoCard';
import { useEffect, useState } from 'react';
import useAuthStore from 'store/useAuthStore';
import useLikeStore from 'store/useLikeStore';

export default function LikeVideo() {
  const [videos, setVideos] = useState([]);
  const { user } = useAuthStore();
  const { fetchLikedVideos, isLoading } = useLikeStore();

  useEffect(() => {
    if (user) {
      fetchLikedVideos(user.uid).then(setVideos);
    }
  }, [fetchLikedVideos, user]);

  if (isLoading) return <Loading />;

  return (
    <>
      <section>
        <div className='p-5 font-black text-lg text-red-700'>🔥좋아요 영상</div>
        {videos && (
          <ul className='grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-5 videoCard'>
            {videos.map((video, index) => (
              <VideoCard key={`${index}`} video={video} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
