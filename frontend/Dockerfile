# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Ativa o Corepack e prepara Yarn 4.9.2 (como definido no package.json)
RUN corepack enable && corepack prepare yarn@4.9.2 --activate

# Copia os arquivos de dependências primeiro (melhor para cache)
COPY package.json yarn.lock ./

# Instala as dependências do projeto
RUN yarn install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para rodar em modo desenvolvimento
# CMD ["yarn", "dev"]
