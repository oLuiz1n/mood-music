import { useState } from "react";
import { useParams } from "react-router-dom";
import CardMusic from "../components/CardMusic.jsx"

function PlaylistPage() {
    const { emocao } = useParams();
    const [musicas, setMusicas] = useState([]);
    const [tempo, setTempo] = useState("");

    async function buscar(tempoEscolhido){
        try {
            setTempo(tempoEscolhido);


        const response = await fetch(`${import.meta.env.VITE_API_URI}/playlist/${emocao}/${tempoEscolhido}`);

        const data = await response.json();
        setMusicas(data.musicas);
        setTempo(tempoEscolhido);
    } catch (error) {
            console.log('Erro ao buscar musicas:', error);
        }
    } 

    function atualizarPlaylist() {
        setTempo("");
        setMusicas([]);
    };

    return (
        <div>
            <h1>Playlist para: {emocao}</h1>
        {!tempo ? (
            <div>
                <h2>Quanto tempo de playlist?</h2>
                <button onClick={() => buscar("30min")}>30 min</button>
                <button onClick={() => buscar("1h")}>1 hora</button>
            </div>
            ):(
                <div>
                    <p>Tempo escolhido: {tempo}</p>
                    <button onClick={atualizarPlaylist}>Atualizar</button>
                </div>
            )}

            {musicas.length > 0 ? (
                musicas.map((musica) => (
                    <CardMusic key={musica.id} musica={musica} />
                ))
            ):(
            tempo && <p>Nenhuma musica encontrada.</p>
            )}
        </div>
    );
};

export default PlaylistPage;