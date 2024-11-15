import React, { useEffect, useState } from 'react';
import { fetchComicDetails } from '../api';
import ListaPersonajesComic from './ListaPersonajesComic';

const DetallesComics = ({ comicId }) => {
    const [comic, setComic] = useState(null);
    const [showCharacters, setShowCharacters] = useState(false);
  
    useEffect(() => {
      const getComicDetails = async () => {
        const data = await fetchComicDetails(comicId);
        setComic(data);
      };
      getComicDetails();
    }, [comicId]);
  
    if (!comic) return <p>Cargando detalles...</p>;
  
    return (
      <div>
        <h2>{comic.title}</h2>
        <p>{comic.description || 'No hay descripción disponible'}</p>
        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
  
        {/* Botón para mostrar personajes */}
        <button onClick={() => setShowCharacters(!showCharacters)}>
          {showCharacters ? 'Ocultar personajes' : 'Mostrar personajes'}
        </button>
  
        {showCharacters && <ListaPersonajesComic comicId={comicId} />}
      </div>
    );
  };

export default DetallesComics;