// src/utils.js

export function saveToFavorites(track) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(track);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}
