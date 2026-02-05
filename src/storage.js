const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'temperaturas.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
  }
}

function readAll() {
  ensureDataFile();
  const raw = fs.readFileSync(FILE_PATH, 'utf-8');
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function appendTemperatura(temperatura) {
  const list = readAll();
  const record = {
    id: Date.now(),
    temperatura,
    timestamp: new Date().toISOString(),
  };
  list.push(record);
  fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2));
  return record;
}

module.exports = {
  appendTemperatura,
  readAll,
};
