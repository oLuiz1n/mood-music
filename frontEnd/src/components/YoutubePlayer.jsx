import { useEffect, useRef, useState } from "react";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import "./YoutubePlayer.css";

function YoutubePlayer({ videoId, onEnd, onNext, onPrev }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "0",
        width: "0",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }

            if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              onEnd?.();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, onEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
        if (playerRef.current) {
            setCurrentTime(playerRef.current.getCurrentTime() || 0);
            setDuration(playerRef.current.getDuration() || 0);
        }
    }, 500);

    return () => clearInterval(interval);
}, []);


  function togglePlayPause() {
    if (!playerRef.current) return;

    const state = playerRef.current.getPlayerState();

    if (state === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  function formatTimer(segundos) {
      if (!segundos) return "0:00";

      const minutos = Math.floor(segundos / 60);
      const segs = Math.floor(segundos % 60);

      return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="youtube-player-container">
      <div ref={containerRef}></div>
    <div className="controls">
      <div className="player-controls">
        <button onClick={onPrev}>
          <SkipBack />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <button onClick={onNext}>
          <SkipForward />
        </button>
        </div>

        <div className="tempo">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              playerRef.current.seekTo(e.target.value, true);
        }}/>
        <p>{formatTimer(currentTime)} / {formatTimer(duration)}</p>
        </div>
    </div>
  </div>
  );
}



export default YoutubePlayer;