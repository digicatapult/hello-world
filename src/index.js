const express = require('express');
const app = express();
const port = 3000;
const timeout = process.env.SERVER_TIMEOUT !== undefined ? Number(process.env.SERVER_TIMEOUT) : 10000;

app.get('/', (request, response) => {
  response.send("Hello world!");
});

const server = app.listen(port, () => {
  console.log('Server running on localhost:%s', port);
});

if (timeout != 0) {
  console.log('Server set to shutdown gracefully in %s ms', timeout);
  setTimeout(() => {
    console.log('Server shutting down due to timeout');
    server.close(() => {});
  }, Number(timeout));
}
