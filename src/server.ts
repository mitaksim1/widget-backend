import express from 'express';
import { routes } from './routes';

// Appel à Express
const app = express();

// Permet la récupération de la requête en format JSON
app.use(express.json());

app.use(routes);

// Lance le serveur
app.listen(3333, () => {
    console.log('HTTP server running!');
});