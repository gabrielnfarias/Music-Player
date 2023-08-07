import React, { useRef, useState } from "react";
import "./App.css";
import Logo from "./assets/logo.svg";
import Profile from "./assets/minhaprofile.jpeg";
import MusicCard from "./components/MusicCard/MusicCard";
import Playbar from "./components/Playbar/PlayBar";
import { musics } from "./musics";

function App() {
  const [currentMusic, setCurrentMusic] = useState({});
  const [musicData, setMusicData] = useState([...musics]);

  const audioRef = useRef(null);
  const handleMusicClick = (music) => {
    setCurrentMusic(music);
  };

  const setNext = () => {
    const currentIndex = musicData.findIndex(
      (music) => music.id === currentMusic.id
    );
    const nextIndex = (currentIndex + 1) % musicData.length;
    setCurrentMusic(musicData[nextIndex]);
  };

  const setPrevious = () => {
    const currentIndex = musicData.findIndex(
      (music) => music.id === currentMusic.id
    );
    const previousIndex =
      (currentIndex - 1 + musicData.length) % musicData.length;
    setCurrentMusic(musicData[previousIndex]);
  };
  return (
    <div className="container">
      <header className="container-header">
        <div>
          <img src={Logo} alt="logo cubos player" className="logo" />
        </div>
        <div className="bem-vindo">
          <img src={Profile} alt="Foto perfil" className="profile-img" />
          <h1>Bem-vindo, Gabriel</h1>
        </div>
      </header>
      <main>
        <h1 className="text-playlist">The best playlist</h1>
        <div className="music-cards">
          {musicData.map((music) => (
            <MusicCard
              key={music.id}
              music={music}
              handleMusicClick={handleMusicClick}
            />
          ))}
        </div>
      </main>
      <Playbar
        currentMusic={currentMusic}
        musics={musics}
        setNext={setNext}
        setPrevious={setPrevious}
      />
    </div>
  );
}

export default App;
