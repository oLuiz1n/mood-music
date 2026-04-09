import { useState } from "react";

function CardMusic({ musica }) {
    const [tocando, setTocando] = useState(false);

    return (
        <div>
        <h2>{musica.nome}</h2>
        <p>{musica.artista}</p>
        <p>{musica.frase}</p>

      <button onClick={() => setTocando(!tocando)}>
        {tocando ? "⏸️" : "▶️"}
      </button>

      {tocando && (
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${musica.youtube_id}?autoplay=1`}
          title={musica.nome}
          allow="autoplay"
        ></iframe>
      )}
        </div>
    )
}

export default CardMusic;