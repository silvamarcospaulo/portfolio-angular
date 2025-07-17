import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AmazonPaApiService } from './services/amazon/amazon-paapi.service';
import { ProdutoAfiliadoAmazon } from './model/produto-afiliado-amazon.model';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const paapi = new AmazonPaApiService();

/**
 * Endpoints da API utilizados pelo aplicativo Angular
 */
app.get('/api/amazon/promocoes', async (_req, res) => {
  try {
    const palavras = ['cadeira gamer', 'monitor', 'notebook'];
    const produtos = [] as ProdutoAfiliadoAmazon[];
    for (const p of palavras) {
      const itens = await paapi.buscarProdutos(p);
      produtos.push(...itens);
    }
    res.json(produtos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: 'Erro ao consultar a Amazon' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
