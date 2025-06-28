// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { startLogs } from './utils/startLogs.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/api-docs', swaggerDocs());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);
  app.listen(PORT, () => {
    startLogs();
  });
};
