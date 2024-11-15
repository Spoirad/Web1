import React from 'react';

const ListaFavoritos = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="favorites-list">
      <h2>Mis cómics favoritos</h2>
      <ul>
        {favorites.map((comic) => (
          <li key={comic.id}>
            <div className="favorites-item-details">
              <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
              <span className="favorites-item-title">{comic.title}</span>
            </div>
            <button onClick={() => onRemoveFavorite(comic.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFavoritos;
