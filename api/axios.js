import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: "http://localhost:8000/gauth",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8000/gauth",
  headers: { 'Content-Type': 'application/json' },
});
