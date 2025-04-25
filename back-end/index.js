const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
const publicKey = fs.readFileSync('public.pem', 'utf8');
app.post('/encriptar', (req, res) => {
  const texto = req.body.texto;
  if (!texto) {
    return res.status(400).json({ error: 'Falta el campo "texto".' });
  }
  const buffer = Buffer.from(texto, 'utf-8');
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  const resultado = encrypted.toString('base64');
  res.json({ encriptado: resultado });
});
app.listen(3000, () => {
  console.log('Servidor Express escuchando en http://localhost:3000');
});