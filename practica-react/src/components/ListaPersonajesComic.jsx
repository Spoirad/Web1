import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../api';

const ListaPersonajesComic = ({ comicId }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters(comicId);
      setCharacters(data);
    };
    getCharacters();
  }, [comicId]);

  if (characters.length === 0) {
    return <p>No se encontraron personajes.</p>;
  }

  return (
    <div>
      <h3>Personajes en este cómic:</h3>
      <div className="character-list">
        {characters.map((char) => (
          <div key={char.id} className="character-card">
            <h4>{char.name}</h4>
            <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`} alt={char.name} />
            <p>{char.description || 'Sin descripción'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListaPersonajesComic;
