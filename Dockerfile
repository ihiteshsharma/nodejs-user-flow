FROM node:lts-alpine3.12

RUN mkdir -p /home/Work/dockerapp/nodejs-user-flow/node_modules && chown -R node:node /home/Work/dockerapp/nodejs-user-flow

WORKDIR /home/Work/dockerapp/nodejs-user-flow

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["node", "server.js"]