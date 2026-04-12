import express from "express";
import pool from "./database.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT

const connectDB = async () => {
    try {
        await pool.getConnection();
        console.log('Conectado ao Banco de Dados');
    } catch (error) {
        console.log('Erro ao conectar com o Banco de Dados', error);
    }
}

connectDB();

app.get('/musicas', async (req, res) => {
    try {
        const[musicas] = await pool.query('SELECT * FROM musicas');
        
        res.json(musicas);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

app.get('/playlist/:emocao/:tempo', async (req, res) => {
    try {
        const { emocao, tempo } = req.params;

        let alvo = 0;

        if (tempo === '30min'){
            alvo = 1800;
        } else if (tempo === '1h') {
            alvo = 3600;
        } else {
            return res.status(400).json({error: 'Tempo Invalido'});
        }

        const[musicas] = await pool.query('SELECT * FROM musicas WHERE emocao_principal = ? ORDER BY intensidade DESC, rand();', [emocao]);

        let playlist = [];
        let total = 0;

        for (const musica of musicas) {
            if (total + musica.duracao_segundos <= alvo) {
                playlist.push(musica);
                total += musica.duracao_segundos;
            }
        }

        res.json({
            emocao,
            tempo,
            total_segundos: total,
            quantidade: playlist.length,
            musicas: playlist
        });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

app.listen(PORT, () => {
    try {
        console.log('Servidor esta conectado');
    } catch (error) {
        console.log('Não foi possivel conectar com o servidor', error);
    }
});