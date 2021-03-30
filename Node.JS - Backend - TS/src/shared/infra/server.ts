import 'reflect-metadata';
import express from 'express';
import routes from '@shared/infra/http/routes';
import './database';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  return res.json({ nessage: 'Hello World' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
