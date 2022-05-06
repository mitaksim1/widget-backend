import express from 'express';
import cors from 'cors';
import { routes } from './routes';

// Appel à Express
const app = express();

// Appel à cors
app.use(cors());

// Permet la récupération de la requête en format JSON
// limit: '50mb' : nous permet d'envoyer une image dans le format base64 qui a une string trop large
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(routes);

// Lance le serveur
app.listen(3333, () => {
    console.log('HTTP server running!');
});