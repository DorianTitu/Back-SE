# Imagen base ligera de Node
FROM node:22-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar dependencias en modo producción
# Usa npm ci si hay package-lock.json; si no, cae a npm install
RUN npm ci --only=production || npm install --only=production

# Copiar el código
COPY src ./src

# Variables y puertos
ENV NODE_ENV=production
EXPOSE 3000

# Ejecutar como usuario no-root
USER node

# Comando de arranque
CMD ["node", "src/server.js"]
