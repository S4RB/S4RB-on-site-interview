import app from './app';

const port = 8080;

const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

process.on('SIGINT', () => server.close());
