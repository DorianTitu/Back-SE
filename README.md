# Backend Simple (Express)

Un backend mínimo con un endpoint que recibe un JSON con un valor de temperatura y nada más.

## Requisitos
- Node.js 18+ (verificado: 22.x)

## Instalación

```bash
npm install
```

## Ejecución

- Desarrollo (recarga automática):
```bash
npm run dev
```

- Producción / simple:
```bash
npm start
```

El servidor arranca en `http://localhost:3000`.

## Docker

- Construir imagen:
```bash
docker build -t back-se .
```

- Ejecutar contenedor:
```bash
docker run -d -p 3000:3000 --name back-se-container back-se
```

- Probar:
```bash
curl -X POST http://localhost:3000/temperatura \
  -H "Content-Type: application/json" \
  -d '{"temperatura": 21.7}'
```

- Detener y eliminar:
```bash
docker stop back-se-container
docker rm back-se-container
```

## Render (Despliegue)

Este repo incluye `render.yaml` para crear un Web Service en Render usando Docker.

Pasos:
- Conecta el repo en Render y selecciona "Web Service".
- Render detectará `render.yaml` y usará el `Dockerfile`.
- Render establece `PORT` automáticamente; el servidor ya usa `process.env.PORT`.
- Endpoint de salud: `/`.

Opcional: variables de entorno adicionales pueden configurarse en Render si las necesitas.

## Endpoints

- `POST /temperatura`
  - Body (JSON):
    ```json
    { "temperatura": 23.5 }
    ```
  - Respuestas:
    - 200 OK: `{ "ok": true, "temperatura": 23.5 }`
    - 400 Bad Request: `{ "ok": false, "error": "mensaje" }`

- `GET /` (salud): devuelve estado básico y lista de endpoints.

- `GET /temperaturas`: lista todos los registros guardados en `data/temperaturas.json`.

## Frontend sencillo

Incluye una página estática accesible en `/web` que muestra los registros y tiene botón "Actualizar".

Local:
```bash
npm run dev
# abre en el navegador: http://localhost:3000/web
```

Render:
- Una vez desplegado, visita: `https://back-se.onrender.com/web`

## Ejemplos de consumo

- `curl`:
```bash
curl -X POST http://localhost:3000/temperatura \
  -H "Content-Type: application/json" \
  -d '{"temperatura": 21.7}'
```

- PowerShell:
```powershell
$body = @{ temperatura = 21.7 } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/temperatura" -ContentType "application/json" -Body $body
```
