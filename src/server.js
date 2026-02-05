const express = require('express');
const { appendTemperatura } = require('./storage');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

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

// Salud básica
app.get('/', (_req, res) => {
  res.json({ ok: true, mensaje: 'Backend simple activo', endpoints: ['/temperatura (POST)'] });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
