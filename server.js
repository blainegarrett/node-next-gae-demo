// server.js is required entry for GAE (vs. start script) - This will likely not be the case post EAP
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT ? process.env.PORT : 3000;

app.prepare().then(() => {
  const server = express();

  // If you need /:param/ type urls allow next and webpack urls - see: https://github.com/zeit/next.js/issues/1433
  //server.get(/next/, (req,res)=> { handle(req,res); });
  //server.get(/webpack/, (req,res)=> { handle(req,res); });

  // Route traffic for /artwork to /pages/artwork/index.js
  server.get('/artwork/:artworkId', (req, res) => {
    //console.log(req.params); // url params - note query is ignored. If you need query params, see: https://github.com/zeit/next.js/blob/master/examples/parameterized-routing/server.js#L25
    return app.render(req, res, '/artwork', req.params);
  });

  // Route all other urls to next "as is" - see note above about /next/ and /webpack/
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
