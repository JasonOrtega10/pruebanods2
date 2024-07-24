const { createServer } = require('https')
const { parse, resolve } = require('url')
const next = require('next')
const fs = require("fs");
const dev = process.env.NODE_ENV !== 'production'
//const prod = process.env.NODE_ENV === 'production'
const hostname = 'localhost'
const port = 3000
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

     if (pathname.startsWith('/share/')) {
      // Get the start time of the page view
      const startTime = new Date().getTime()

      await handle(req, res, parsedUrl)

      // Get the end time of the page view
      const endTime = new Date().getTime()

      // Calculate the time in view in milliseconds
      const timeInView = endTime - startTime

      console.log(`Page "${pathname}" was viewed for ${timeInView} ms`)
    } else {
      await handle(req, res, parsedUrl)
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`Server ready Ready on http://${hostname}:${port}`)
  })
})
