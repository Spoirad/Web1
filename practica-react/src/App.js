import React, { useState, useEffect } from 'react';
import { fetchComics } from './api';

import ListaComics from './components/ListaComics';
import ListaFavoritos from './components/ListaFavoritos';
import DetallesComics from './components/DetallesComics';
import "./App.css";

function App() {
  const [comics, setComics] = useState([]);
  const [selectedComicId, setSelectedComicId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    const loadComics = async () => {
      const data = await fetchComics();
      setComics(data);
    };

    loadComics();
  }, []);

  const handleSelectComic = (id) => {
    setSelectedComicId(id);
  };

  const handleAddFavorite = (comic) => {
    if (!favorites.find((fav) => fav.id === comic.id)) {
      const updatedFavorites = [...favorites, comic];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app-container">
      <h1>Marvel Comics App</h1>
      {selectedComicId ? (
        <div>
          <DetallesComics comicId={selectedComicId} />
          <button onClick={() => setSelectedComicId(null)}>Volver a la lista</button>
        </div>
      ) : (
        <ListaComics comics={comics} onSelectComic={handleSelectComic}  onAddFavorite={handleAddFavorite}/>
      )}
      <ListaFavoritos favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />
    </div>
  );
}

export default App;