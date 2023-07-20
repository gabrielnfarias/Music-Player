import React, { useRef, useState } from "react";
import NextIcon from "./../../assets/next.svg";
import PauseIcon from "./../../assets/pause.svg";
import PlayIcon from "./../../assets/play.svg";
import PreviousIcon from "./../../assets/previous.svg";
import StopIcon from "./../../assets/stop.svg";
import "./styles.css";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

function Playbar({ currentMusic, musics, setNext, setPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    } else {
      audioRef.current.play();
      intervalRef.current = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleDuration = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className="container-PlayBar">
      <div className="container-controles">
        <div className="name-music-player">
          <span className="music-name">{currentMusic?.title}</span>
          <span className="music-artist">{currentMusic?.artist}</span>
        </div>
        <div className="commands">
          <div className="controls">
            <img src={StopIcon} alt="stop-icon" onClick={handleStop} />
            <img src={PreviousIcon} alt="prev-icon" onClick={setPrevious} />
            <img
              src={!isPlaying ? PlayIcon : PauseIcon}
              alt="toggle-play"
              onClick={handleTogglePlay}
            />
            <img src={NextIcon} alt="next-icon" onClick={setNext} />
          </div>
          <div className="progress-bar-container">
            <span className="timming">{formatTime(currentTime)}</span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              ></div>
            </div>
            <span className="total-time">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      {currentMusic && (
        <audio
          src={currentMusic?.url}
          ref={audioRef}
          autoPlay={isPlaying}
          onLoadedData={handleDuration}
        />
      )}
    </div>
  );
}

export default Playbar;
