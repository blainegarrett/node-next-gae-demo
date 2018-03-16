// server.js is required entry point for
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/artwork/:id', (req, res) => {
    return app.render(req, res, '/artwork', { id: req.params.id })
  })

 server.get('*', (req, res) => {
    return handle(req, res)
  })


  server.listen(8080, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:8080')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})