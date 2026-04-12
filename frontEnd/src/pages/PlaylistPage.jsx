import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardMusic from "../components/CardMusic.jsx"
import "../PlaylistPage.css";

function PlaylistPage() {
    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

    const { emocao } = useParams();
    const [musicas, setMusicas] = useState([]);
    const [tempo, setTempo] = useState("");
    const [musicaAtual, setMusicaAtual] = useState("");

    const configEmocao = {
        tristeza:{
            titulo: "Você não precisa sair disso agora… só sentir já é o suficiente.",
            classe: "tristeza"
        },
        alegria:{
            titulo: "Aproveita esse momento… nem todo dia a gente se sente assim.",
            classe: "alegria"
        },
        raiva: {
            titulo: "Nem tudo precisa ser resolvido agora… respira primeiro.",
            classe: "raiva"
        },
        apaixonado: {
            titulo: "Tem sentimentos que simplesmente não precisam de explicação.",
            classe: "apaixonado"
        },
         confuso: {
            titulo: "Tá tudo bem não ter respostas agora… nem tudo precisa fazer sentido hoje.",
            classe: "confuso"
        },
        tranquilo: {
            titulo: "Fica aqui mais um pouco… você merece esse momento.",
            classe: "tranquilo"
        }
    };

    const dados = configEmocao[emocao] || {
        titulo: `Playlist para ${emocao}`,
        frase: "Uma seleção feita para seu momento.",
        classe: "default"
    };

    async function buscar(tempoEscolhido){
        try {
            setTempo(tempoEscolhido);
            
        const response = await fetch(`${import.meta.env.VITE_API_URL}/playlist/${emocao}/${tempoEscolhido}`);

        const data = await response.json();
        setMusicas(data.musicas);
    } catch (error) {
            console.log('Erro ao buscar musicas:', error);
        }
    } 

    function atualizarPlaylist() {
        setTempo("");
        setMusicas([]);
    };

    return (
        <div className={`playlist-page ${dados.classe}`}>
        {!tempo ? (
            <div>
                <h1>Quanto tempo de playlist você precisa?</h1>
                <div className="btns-tempo">
                <button onClick={() => buscar("30min")}>30 min</button>
                <button onClick={() => buscar("1h")}>1 hora</button>
                </div>
            </div>
            ):(
                <div>
                    <h1>{dados.titulo}</h1>
                    <p>Tempo de playlist escolhido: {tempo}</p>
                    <button className="btn-att" onClick={atualizarPlaylist}>Atualizar</button>
                </div>
            )}

            {musicas.length > 0 ? (
            <div className="playlist">
              <div className="cards">
                  {musicas.map((musica, index) => (
                      <CardMusic 
                      key={musica.id} 
                      musica={musica} 
                      index={index}
                      musicaAtual={musicaAtual}
                      setMusicaAtual={setMusicaAtual}
                      totalMusicas={musicas.length}
                      />
                  ))}
              </div>  
            </div>  
            ):(
            tempo && <p>Nenhuma musica encontrada.</p>
            )}
        </div>
    );
};

export default PlaylistPage;