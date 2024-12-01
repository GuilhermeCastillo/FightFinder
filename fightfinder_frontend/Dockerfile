# Etapa 1: Construir o projeto Angular
FROM node:alpine AS build

WORKDIR app

COPY *package*.json ./
RUN npm install

# Fazendo o build da aplicação
RUN npx ngcc --properties es2023 browser modele main --first only --create-ivy-entry-points

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=build /app/dist/tcc-fight-finder/ /usr/share/nginx/html

EXPOSE 80
