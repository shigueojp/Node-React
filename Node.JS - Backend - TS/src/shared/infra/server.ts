import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from '@shared/infra/http/routes';
import './database';
import '@shared/container';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});
// Servindo arquivos estáticos
app.use('/files', express.static(uploadConfig.directory));

app.get('/', (req, res) => {
  return res.json({ nessage: 'Hello World' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
