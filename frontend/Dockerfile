# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Ativa o corepack para Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Copia apenas os arquivos de dependência primeiro (melhor uso de cache)
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Agora copia o resto do código (depois do cache de dependência)
COPY . .

# Expõe a porta do Vite dev server
EXPOSE 5173

# Comando padrão para dev
CMD ["yarn", "dev"]()
