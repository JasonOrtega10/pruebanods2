const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require("fs");
const dev = process.env.NODE_ENV !== 'production'
//const prod = process.env.NODE_ENV === 'production'
const hostname = 'localhost'
const port = 8000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: fs.readFileSync("priv.pem"),
  cert: fs.readFileSync("cert.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
 
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      await handle(req, res, parsedUrl)
    
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`Server ready Ready on http://${hostname}:${port}`)
    })
})

