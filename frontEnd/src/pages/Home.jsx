import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
    <div>
        <div>
            <h1>Como você está se sentindo hoje?</h1>
        </div>

        <div>
            <button onClick={() => navigate("/playlist/alegria")}>Alegria</button>
            <button onClick={() => navigate("/playlist/tristeza")}>Tristeza</button>
            <button onClick={() => navigate("/playlist/raiva")}>Raiva</button>
            <button onClick={() => navigate("playlist/apaixonado")}>Apaixonado</button>
            <button onClick={() => navigate("/playlist/confuso")}>Confuso</button>
        </div>
    </div>
    );
};

export default Home;