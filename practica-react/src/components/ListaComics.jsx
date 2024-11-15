import React from 'react';

const ListaComics = ({ comics, onSelectComic, onAddFavorite }) => {
    return (
        <div>
          <h2>Lista de Cómics</h2>
          <div className="comic-list">
            {comics.map((comic) => (
              <div key={comic.id} className="comic-card">
                <h3>{comic.title}</h3>
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                <div className="button-group">
                  {/* Botón para ver los detalles del cómic */}
                  <button onClick={() => onSelectComic(comic.id)}>Ver detalles</button>
                  {/* Botón para añadir a favoritos */}
                  <button onClick={() => onAddFavorite(comic)}>Añadir a favoritos</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default ListaComics;
