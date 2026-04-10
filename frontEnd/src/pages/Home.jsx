import { useNavigate } from 'react-router-dom';
import "../style.css";

function Home() {
    const navigate = useNavigate();

    return (
    <div>
        <div className='cabecalho'>
            <h1>Bem vindo ao <span className="nome">Mood Music</span></h1>
            <h2>Deixe a música entender o que você sente</h2>
        </div>

<div className="texto1">
  <h3>Sobre sentir, não só ouvir</h3>

  <p className="bloco">
    A música sempre foi algo muito importante na minha vida.
    <br />
    Ela esteve presente nos meus melhores momentos...
    <br />
    e também nos mais difíceis.
  </p>

  <p className="bloco">
    E com o tempo eu percebi uma coisa:
    <br />
    A música não muda só o seu humor.
    <br />
    Ela te acompanha nele.
  </p>

  <p className="bloco destaque">
    Um exemplo:
    <br />
    se você está triste, você não quer ouvir algo barulhento ou fora do momento...
    <br />
    você quer algo que te entenda, algo confortável.
  </p>

  <p className="bloco">
    E é exatamente isso que a música faz.
    <br />
    Ela te conforta na emoção que você está sentindo,
    <br />
    e, aos poucos, te dá espaço pra entender aquilo...
    <br />
    e até sair desse estado, se quiser.
  </p>

  <p className="bloco destaque">
    E foi pensando nisso que esse projeto nasceu...
    <br />
    O Mood Music não foi criado só para indicar músicas.
    <br />
    Ele foi criado para entender momentos.
    <br />
    Para entregar sons que combinem com o que você sente agora.
  </p>

  <p className="bloco">
    Porque às vezes tudo o que a gente precisa
    <br />
    não é de alguém dizendo o que fazer...
    <br />
    mas de uma música certa, no momento certo.
  </p>

  <p className="bloco destaque">
    Uma música que acolhe.
    <br />
    Uma música que conversa com você sem dizer uma palavra.
    <br />
    Uma música que transforma o ambiente, a cabeça e o coração.
  </p>

  <p className="bloco final">
    Esse projeto é sobre isso.
    <br />
    Sobre emoção.
    <br />
    Sobre conexão.
    <br />
    Sobre encontrar, na música, um lugar onde você possa se sentir entendido.
  </p>
</div>

        <div className='escolhas'>
            <h1>
            Aqui, você escolhe sua emoção
            e deixa a música fazer o resto.
            </h1>
        </div>

        <div className='botoes'>
            <button className='btn-alegria' onClick={() => navigate("/playlist/alegria")}>Alegria</button>
            <button className='btn-tristeza' onClick={() => navigate("/playlist/tristeza")}>Tristeza</button>
            <button className='btn-raiva' onClick={() => navigate("/playlist/raiva")}>Raiva</button>
            <button className='btn-apaixonado' onClick={() => navigate("playlist/apaixonado")}>Apaixonado</button>
            <button className='btn-confuso' onClick={() => navigate("/playlist/confuso")}>Confuso</button>
        </div>
    </div>
    );
};

export default Home;