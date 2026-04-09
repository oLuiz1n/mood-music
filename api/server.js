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

app.get('/musicas/:emocao', async (req, res) => {
    try {
        const { emocao } = req.params;

        const[musicas] = await pool.query('SELECT * FROM musicas WHERE emocao_principal = ? ORDER BY RAND() LIMIT 2;', [emocao]);

        res.json(musicas)
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