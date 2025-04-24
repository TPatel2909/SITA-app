import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import bootstrap from './main.server';
import { config } from './app/app.config.server';

const server = express();
const distFolder = process.cwd() + '/dist/sita-app/browser';

// Set up view engine
server.set('view engine', 'html');
server.set('views', distFolder);

// Serve static files
server.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

// Catch all routes
server.get('*', async (req, res) => {
  try {
    const html = await renderApplication(bootstrap, {
      document: '<app-root></app-root>',
      url: req.url,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl }
      ]
    });
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
const port = process.env['PORT'] || 4000;
const run = () => {
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
};

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the port is properly closed when the app stops
const mainModule = require.main;
if (mainModule && mainModule.filename === __filename) {
  run();
}

export * from './app/app.config.server';
