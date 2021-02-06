import express from 'express';
import cors from 'cors';
import path from 'path';

import { removeBgRouter } from './routes/apiRoutes.js';
import { passwordRouter } from './routes/passwordRoutes.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json({ limit: '1000kb' }));
// app.use(express.urlencoded({ limit: '200kb' }));

/**
 * Vinculando o React ao app
 */
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Rotas principais do app
 */
app.use('/api/', removeBgRouter);
app.use('/password/', passwordRouter);

const APP_PORT = 8080;

app.listen(process.env.PORT || APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
