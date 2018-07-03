const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const sanitizeHtml = require('sanitize-html');

const support = checkBrowserSupport();

const fs = require('fs');
const { join } = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const { parse } = require('url');

app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query = {} } = parsedUrl;

    support
      ? res.set('supported', 'true')
      : res.set('support', 'false');

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      return app.serveStatic(req, res, filePath);
    }
    return handle(req, res, parsedUrl);
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

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

function checkBrowserSupport() {
  const { detect } = require('detect-browser');
  const browser = detect();

  // handle the case where we don't detect the browser
  if(browser && ((browser.name === 'edge') || (browser.name === 'ie')))
    return false;
  else 
    return true;
}