import "./CardMusic.css";
import { Play, Pause, SkipForward, SkipBack} from "lucide-react";

function CardMusic({musica, index, musicaAtual, setMusicaAtual, totalMusicas }) {
  return (
        <div className={`card ${musicaAtual === index ? "ativo" : ""}`}>
        <h2>{musica.nome}</h2>
        <p>{musica.artista}</p>
    <div className="player-controls">
      <button className="btn-ant" onClick={() => {
          if (index > 0) {
            setMusicaAtual(index - 1);
          }
      }}><SkipBack/></button>

      <button className="btn-play" onClick={() => setMusicaAtual(musicaAtual === index ? null : index)}>
        {musicaAtual === index ? <Pause /> : <Play />}
      </button>

      <button className="btn-prox" onClick={() => {
          if (index < totalMusicas - 1) {
            setMusicaAtual(index + 1);
          }
      }}><SkipForward/></button>
    </div>

      <p>{musica.frase}</p>

      {musicaAtual === index && (
        <iframe
          width="0"
          height="0"
          frameBorder="0"
          src={`https://www.youtube.com/embed/${musica.youtube_id}?autoplay=1`}
          title={musica.nome}
          allow="autoplay"
        ></iframe>
      )}
        </div>
  )
}

export default CardMusic;