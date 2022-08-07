FROM node:alpine

WORKDIR /prometheus-grapfana-integration

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY server.js .

EXPOSE 8080

CMD [ "node" , "server.js" ]
