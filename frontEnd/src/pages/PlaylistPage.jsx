import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardMusic from "../components/CardMusic.jsx"

function PlaylistPage() {
    const { emocao } = useParams();
    const [musicas, setMusicas] = useState([]);

    useEffect(() => {
    async function buscar(){
        try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/${emocao}`);
        const data = await response.json();
        setMusicas(data);
    } catch (error) {
            console.log('Erro ao buscar musicas:', error);
        }
    } 

        buscar();
    }, [emocao]);

    return (
        <div>
            <h1>Playlist para: {emocao}</h1>

            {musicas.length > 0 ? (
                musicas.map((musica) => (
                    <CardMusic key={musica.id} musica={musica} />
                ))
            ):(
                <p>Nenhuma musica encontrada.</p>
            )}
        </div>
    );
};

export default PlaylistPage;