import { generallogin, menus } from 'data/header';
import { useEffect } from 'react';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import useAuthStore from 'store/useAuthStore';

export default function GeneralLogin() {
  const { user, isAuthLoading, generalAuthAction, checkAuthState } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = checkAuthState();
    return () => {
      unsubscribe();
    };
  }, [checkAuthState]);
  return (
    <div className='menu login'>
      <ul className='menu login' role='menubar'>
        {generallogin.map((l, index) => (
          <li key={index} role='none' tabIndex={menus.length + index + 1}>
            <Link role='menuitem' to={'/'} onClick={generalAuthAction}>
              {isAuthLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  {!user ? l.icon : <img src={user.photoURL} alt='User' />}
                  {user ? (
                    'Logout'
                  ) : (
                    <>
                      <span>Login</span>
                    </>
                  )}
                </>
              )}
            </Link>
          </li>
        ))}
        {user && (
          <li>
            <Link to='/likeVideo'>
              <FcLike />
              Saved video
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
