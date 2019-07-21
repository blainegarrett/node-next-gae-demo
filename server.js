const express = require('express');
const next = require('next');
var compression = require('compression');

/*
Note: process.env.NODE_ENV is automatically set by GAE  when deployed
  but will need to be manually set locally via `NODE_ENV=production npm run start`
*/
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

// GAE passes the port the app will run on via process.env.PORT
const port = process.env.PORT ? process.env.PORT : 3000;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    // Note: We're using Next.Js 9's file based dynamic routing so no need to match dynamic urls as in  version
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log(
        `> Ready on http://localhost:${port} NODE_ENV: ${process.env.NODE_ENV}`
      );
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
