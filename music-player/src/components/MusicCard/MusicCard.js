import "./styles.css";
import React from "react";
export default function MusicCard({ music, handleMusicClick }) {
  const handleClick = () => {
    handleMusicClick(music);
  };

  return (
    <div className="music-card" onClick={handleClick}>
      <img className="music-img" src={music.cover} alt="Capa da Música" />
      <h2 className="music-title">{music.title}</h2>
      <p className="music-desc">{music.description}</p>
    </div>
  );
}
