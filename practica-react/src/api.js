import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = '75892ef3e88bf70ffc63d7ff787cab7e';
const PRIVATE_KEY = '0ac65754738f51a046e94f5976be967e40270f5b';
const ts = new Date().getTime();
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
const BASE_URL = 'https://gateway.marvel.com/v1/public';

export const fetchComics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/comics`, {
      params: {
        ts,
        apikey: PUBLIC_KEY,
        hash,
        orderBy: '-modified',
        limit: 12,
      },
    });
    console.log( response.data.data.results);
    return response.data.data.results;
  } catch (error) {
    console.error('Error al obtener los cómics:', error);
    return [];
  }
};

export const fetchComicDetails = async (comicId) => {
  try {
    const response = await axios.get(`${BASE_URL}/comics/${comicId}`, {
      params: {
        ts,
        apikey: PUBLIC_KEY,
        hash,
      },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error al obtener los detalles del cómic:', error);
    return null;
  }
};

export const fetchCharacters = async (comicId) => {
  try {
    const response = await axios.get(`${BASE_URL}/comics/${comicId}/characters`, {
      params: {
        ts,
        apikey: PUBLIC_KEY,
        hash,
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    return [];
  }
};
