const Raven = require('raven');
const url = require('url');
const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const takeScreenshot = require('./utils/screenshot');
const app = express();

const PRODUCTION = process.env.NODE_ENV === 'production';
const TARGET_HOST = process.env.TARGET_HOST || 'https://s3.amazonaws.com';
const PORT = process.env.PORT || 5000;

if (PRODUCTION && process.env.RAVEN_ENDPOINT) {
  Raven.config(process.env.RAVEN_ENDPOINT).install();
}

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true,
});

if (PRODUCTION) {
  app.use(express.static(path.join(__dirname, 'dist')));
} else {
// Development
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.dev');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {}));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/', (req, res) => {
  res.render('index.njk', {
    production: PRODUCTION,
    target: TARGET_HOST,
  });
});

app.get('/shoot', async (req, res) => {
  const path = req.query.path;
  const selector = req.query.selector;
  const padding = req.query.padding;

  console.log('PARAMS', path, selector);

  if (!path || !selector) {
    console.log('🛑 Request missing required query parameters.');
    res.status(422);
    return res.end();
  }

  const target = url.resolve(TARGET_HOST, path);

  try {
    const screenshot = await takeScreenshot(target, selector, padding);
    if (screenshot) {
      res.type('image/png');
      res.send(screenshot);
    } else {
      console.log('🛑 No screenshot returned from request.');
      res.status(422);
      return res.end();
    }
  } catch (e) {
    console.log('🛑 Error taking screenshot.');
    console.error(e);
    res.status(500);
    return res.end();
  }
});

app.listen(PORT, () => console.log(`📸  botshot listening on port ${PORT}.`));
