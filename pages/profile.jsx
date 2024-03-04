import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Profile() {
  const router = useRouter();
  const email = router.query.email;
  const [myEmails, setMyEmails] = useState([]);
  const axios = useAxiosPrivate();
  const [fetching, setFetching] = useState(false);
  const handlSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('clientEmail');
    router.push('/');
  };
  const handlFetchLastEmail = async () => {
    setFetching(true);
    try {
      const res = await axios.get('/analyse-email');
      setMyEmails(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const fetch = async () => {
    try {
      await axios.get('/get-user');
      handlFetchLastEmail();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(myEmails);
  }, [myEmails]);
  return (
    <div>
      <div className='profile'>
        <h1 className='profileEmail'>{email}</h1>
        <button onClick={handlSignOut} type='button' className='signUpButton'>
          Log out
        </button>
      </div>
      <button
        onClick={handlFetchLastEmail}
        type='button'
        className=''
        disabled={fetching}
      >
        {fetching ? 'Fetching latest emails...' : 'Update list'}
      </button>
      <div style={{ padding: '20px' }}>
        {myEmails.map((email) => {
          return (
            <div style={{ padding: '10px' }} className='tile'>
              <div className='flex'>
                <div style={{ width: '150px' }}>From:</div>
                <div>{email.from}</div>
              </div>
              <div className='flex'>
                <div style={{ width: '150px' }}>Subject:</div>
                <div>{email.subject}</div>
              </div>

              <div className='flex'>
                <div style={{ width: '150px' }}>Attachments:</div>
                <div className='flex'>
                  {email.attachments.map((attachment, index) => (
                    <div
                      onClick={() => {
                        window.open('http://localhost:8000/' + attachment);
                      }}
                      key={index}
                      className='textWrapNone'
                    >
                      {attachment}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
