const express = require('express');
const app = express();
const port = 3000;
const timeout = (() => {
  const raw = process.env.SERVER_TIMEOUT;
  if (raw === undefined || raw.trim() === '') return 10000;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 10000;
})();

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
