export const fetchPlaylist = async (mood) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockPlaylists = {
    relaxed: [
      {
        name: "Evening Breeze",
        artist_name: "Lo-Fi Chill",
        audioUrl: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
      },
      {
        name: "Soft Vibes",
        artist_name: "Ocean Tones",
        audioUrl: "https://www.bensound.com/bensound-music/bensound-relaxing.mp3"
      }
    ],
    motivated: [
      {
        name: "Rise and Grind",
        artist_name: "Upbeat Collective",
        audioUrl: "https://www.bensound.com/bensound-music/bensound-extremeaction.mp3"
      },
      {
        name: "Victory Lap",
        artist_name: "Momentum Crew",
        audioUrl: "https://www.bensound.com/bensound-music/bensound-actionable.mp3"
      }
    ],
    creative: [
      {
        name: "Flow State",
        artist_name: "Artmind",
        audioUrl: "https://www.bensound.com/bensound-music/bensound-goinghigher.mp3"
      },
      {
        name: "Canvas Dreams",
        artist_name: "Lo-Fi Vision",
        audioUrl: "https://www.bensound.com/bensound-music/bensound-dreams.mp3"
      }
    ]
  };

  return mockPlaylists[mood] || [];
};

