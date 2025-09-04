const express = require('express');
const app = express();

// Middleware para servir arquivos estáticos e HTML
app.use(express.static('public'));

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Lógica principal do microserviço de timestamp
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Se o parâmetro de data estiver vazio, use a data e hora atuais
  if (!dateParam) {
    date = new Date();
  } else {
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Verifique se a data é válida
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    // Retorne o objeto JSON com unix e utc
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Defina a porta do servidor
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Seu aplicativo está ouvindo na porta ' + listener.address().port);
});