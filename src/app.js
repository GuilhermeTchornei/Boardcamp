import express from 'express';
import cors from 'cors';
import GamesRouter from './Routes/GamesRoutes.js';
import customersRouter from './Routes/CustomersRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use([GamesRouter, customersRouter]);

app.listen(5000, () => console.log("servidor conectado"));