import express from 'express';
import cors from 'cors';
import GamesRouter from './Routes/GamesRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use([GamesRouter]);

app.listen(5000, () => console.log("servidor conectado"));