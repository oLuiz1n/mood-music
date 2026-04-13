import "./CardMusic.css";
import { Play, Pause, SkipForward, SkipBack} from "lucide-react";

function CardMusic({musica, index, musicaAtual, setMusicaAtual, totalMusicas }) {
  return (
        <div className={`card ${musicaAtual === index ? "ativo" : ""}`}
        onClick={() => setMusicaAtual(index)}>
        <h2>{musica.nome}</h2>
        <p>{musica.artista}</p>

        <p>{musica.frase}</p>

      {musicaAtual === index && (
        <iframe
          width="0"
          height="0"
          frameBorder="0"
          title={musica.nome}
          allow="autoplay"
        ></iframe>
      )}
        </div>
  )
}

export default CardMusic;