const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { join } = require('path')
const next = require('next');
const sanitizeHtml = require('sanitize-html');

const sslRedirect = require('heroku-ssl-redirect');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

const { parse } = require('url');
const getRoutes = require('./routes');

const routes = getRoutes();

app.prepare()
  .then(() => {
    const server = express();
    server.use(sslRedirect());

    server.use(compression());

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query = {} } = parsedUrl;
      const route = routes[pathname];

      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname);
        return app.serveStatic(req, res, filePath);
      } else if(route)
        return app.render(req, res, route.page, route.query);
      
      return handle(req, res, parsedUrl);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });

    server.use(bodyParser.json());
    server.post('/send', (req, res) => {
      // SANITIZE
      for (let key in req.body) {
        const sanitize = sanitizeHtml(req.body[key]);
        req.body[key] = !sanitize 
          ? '<strong>XSS Blocked</strong>' 
          : sanitize;
      }
      require('./backend/email.js')(req.body, res);
    });
  });
