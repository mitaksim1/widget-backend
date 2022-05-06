import express from 'express';
import { routes } from './routes';
import cors from 'cors';

// Appel à Express
const app = express();

// Appel à cors
app.use(cors());

// Permet la récupération de la requête en format JSON
app.use(express.json());

app.use(routes);

// Lance le serveur
app.listen(3333, () => {
    console.log('HTTP server running!');
});