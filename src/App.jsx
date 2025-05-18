import { useState, useRef } from 'react';
import './App.css';
import { fetchPlaylist } from './api/spotify';
import { saveToFavorites, getFavorites } from './utils';
import { moodAudioMap } from './constants/audioSamples';

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(getFavorites());
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);

  const audioRef = useRef(new Audio());

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setLoading(true);

    // Play background mood audio
    const moodAudio = moodAudioMap[mood];
    if (moodAudio) {
      try {
        audioRef.current.pause();
        audioRef.current.src = moodAudio;
        await audioRef.current.play();
        setNowPlaying(`Mood: ${mood}`);
        setIsPlaying(true);
      } catch (err) {
        console.error('Mood music error:', err);
      }
    }

    try {
      const tracks = await fetchPlaylist(mood.toLowerCase());
      setPlaylist(tracks);
    } catch (err) {
      console.error('Playlist fetch failed:', err);
      setPlaylist([]);
    }

    setLoading(false);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    setNowPlaying(null);
  };

  const handleTrackPlay = async (track) => {
    if (!track.audioUrl) {
      alert("This track doesn't have an audio URL.");
      return;
    }

    try {
      audioRef.current.pause();
      audioRef.current.src = track.audioUrl;
      await audioRef.current.play();
      setIsPlaying(true);
      setNowPlaying(`${track.name} - ${track.artist_name}`);
    } catch (err) {
      console.error('Track playback error:', err);
    }
  };

  const addToFavorites = (track) => {
    saveToFavorites(track);
    setFavorites(getFavorites());
  };

  return (
    <div className="App">
      <h1>Mood-Based Playlist Generator 🎶</h1>

      <div className="selectors">
        <h2>Select your mood:</h2>
        {['Relaxed', 'Motivated', 'Creative'].map((mood) => (
          <button key={mood} onClick={() => handleMoodSelect(mood)}>
            {mood}
          </button>
        ))}
      </div>

      {isPlaying && nowPlaying && (
        <div className="now-playing">
          <p>Now Playing: <strong>{nowPlaying}</strong></p>
          <button onClick={handlePause}>⏸ Pause</button>
        </div>
      )}

      {loading && <p className="loading">Loading playlist...</p>}

      {!loading && selectedMood && (
        <>
          <h2>Playlist for {selectedMood}</h2>
          {playlist.length ? (
            <ul className="playlist">
              {playlist.map((track, index) => (
                <li key={index} className="track-item">
                  <div className="track-info">
                    <strong>{track.name}</strong> by {track.artist_name}
                  </div>
                  <div className="track-actions">
                    {track.audioUrl && (
                      <button className="play-btn" onClick={() => handleTrackPlay(track)}>
                        ▶️ Play
                      </button>
                    )}
                    <button className="fav-btn" onClick={() => addToFavorites(track)}>
                      ⭐ Favorite
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tracks found for this mood.</p>
          )}
        </>
      )}

      <div>
        <h2>Favorites</h2>
        <ul className="playlist">
          {favorites.map((track, index) => (
            <li key={index} className="track-item">
              <div className="track-info">
                <strong>{track.name}</strong> by {track.artist_name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;




