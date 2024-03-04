import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
('client');
const useAxiosPrivate = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
