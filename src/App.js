import AuthLoader from 'auth/AuthLoader';
import Loading from 'components/contents/Loading';
import React, { Suspense } from 'react';

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthLoader />
    </Suspense>
  );
}
