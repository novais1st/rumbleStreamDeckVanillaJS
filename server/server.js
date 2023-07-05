const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/', routes);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);

  const open = await import('open').then(m => m.default || m);

  const url = 'http://localhost:3000';

  // Abrir a URL no navegador padrão
  open(url)
    .then(() => console.log('Navegador aberto com sucesso!'))
    .catch(err => console.error('Erro ao abrir o navegador:', err));
});
