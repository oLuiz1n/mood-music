function CardMusic({ musica, index, musicaAtual, setMusicaAtual }) {
    return (
        <div>
        <h2>{musica.nome}</h2>
        <p>{musica.artista}</p>
        <p>{musica.frase}</p>

      <button onClick={() => setMusicaAtual(musicaAtual === index ? null : index)}>
        {musicaAtual === index ? "⏸️" : "▶️"}
      </button>



      {musicaAtual === index && (
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