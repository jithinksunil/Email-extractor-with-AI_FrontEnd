import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAccess = async (e) => {
    setLoading(true);
    const res = await fetch('/api/auth').then((res) => res.json());
    router.push(res.url);
  };

  const handleTokens = useCallback(
    async (code) => {
      const response = await fetch('/api/tokens', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());
      localStorage.setItem('accessToken', response.tokens.access_token);
      localStorage.setItem('refreshToken', response.tokens.refresh_token);
      localStorage.setItem('userEmail', response.email);
      router.push({ pathname: '/profile', query: { email: response.email } });
      toast.success('Gmail account connected successfully');
      setLoading(false);
    },
    [router]
  );

  useEffect(() => {
    if (router.query.code) {
      setLoading(true);
      handleTokens(router.query.code);
    }
  }, [router, handleTokens]);

  return (
    <div className='container'>
      <h1 className='heading'>Email Extractor</h1>
      {!loading ? (
        <button onClick={handleAccess} type='button' className='signUpButton'>
          {' '}
          Sign up with Google
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
}
