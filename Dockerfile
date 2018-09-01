FROM node:9-alpine

ENV NPM_CONFIG_LOGLEVEL warn

COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000