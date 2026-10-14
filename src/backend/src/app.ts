import express, { type ErrorRequestHandler } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'badmin-booking-hub-api' });
  });

  if (process.env.NODE_ENV === 'production') {
    const frontendDirectory = path.resolve(currentDirectory, '../../frontend/dist');
    app.use(express.static(frontendDirectory, { index: false, maxAge: '1d' }));
    app.get(/^(?!\/api(?:\/|$)).*/, (_request, response) => {
      response.sendFile(path.join(frontendDirectory, 'index.html'));
    });
  }

  app.use('/api', (_request, response) => {
    response.status(404).json({ error: 'API route not found' });
  });

  const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
    console.error('Unhandled request error', error);
    response.status(500).json({ error: 'Internal server error' });
  };
  app.use(errorHandler);

  return app;
}
