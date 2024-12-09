import Loading from 'components/contents/Loading';
import { auth } from 'firebaseapi/firebase';
import { useEffect, useState } from 'react';
import AppRouter from 'routers/AppRouter';

export default function AuthLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        await auth.authStateReady();
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };

    init();
    return () => (isMounted = false);
  }, []);

  return isLoading ? <Loading /> : <AppRouter />;
}
