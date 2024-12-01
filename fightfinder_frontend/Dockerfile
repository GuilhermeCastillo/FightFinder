# Etapa 1: Construir o projeto Angular
FROM node:alpine AS build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli
RUN npm install

# Fazendo o build da aplicação
RUN ng build --prod

# Etapa 2: Servir os arquivos com NGINX
FROM nginx:alpine

# Copiar os arquivos do build para o diretório do NGINX
COPY --from=build /usr/src/app/dist/[nome-do-seu-projeto] /usr/share/nginx/html

# Expor a porta 80 para o NGINX
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
