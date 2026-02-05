const express = require('express');
const path = require('path');
const { appendTemperatura, readAll } = require('./storage');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
// Servir estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint POST que recibe un JSON con un valor de temperatura
// Espera: { "temperatura": number }
app.post('/temperatura', (req, res) => {
  const { temperatura } = req.body || {};

  // Validación mínima
  if (temperatura === undefined) {
    return res.status(400).json({ ok: false, error: 'Falta el campo "temperatura" en el JSON.' });
  }
  if (typeof temperatura !== 'number' || Number.isNaN(temperatura)) {
    return res.status(400).json({ ok: false, error: 'El campo "temperatura" debe ser un número válido.' });
  }

  // Guardar en JSON como nuevo registro
  const saved = appendTemperatura(temperatura);
  return res.status(201).json({ ok: true, saved });
});

// Endpoint GET para recuperar todos los registros
app.get('/temperaturas', (_req, res) => {
  const data = readAll();
  return res.status(200).json({ ok: true, data });
});

// Salud básica
app.get('/', (_req, res) => {
  res.json({ ok: true, mensaje: 'Backend simple activo', endpoints: ['/temperatura (POST)', '/temperaturas (GET)', '/web (UI)'] });
});

// Página simple
app.get('/web', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
