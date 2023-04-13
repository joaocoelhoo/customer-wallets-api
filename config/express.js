const express = require('express');
const bodyParser = require('body-parser');
// o body-parser é um middleware capaz de converter o body da requisição para vários formatos.
const config = require('config');
// Este pacote config nos permite organizar a configuração da nossa aplicação e estender em qualquer arquivo.
const consign = require('consign');

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  // ENDPOINTS
  consign({cwd: 'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

  require('../api/routes/customerWallets')(app);

  return app;
};