FROM node:9-alpine

ENV NPM_CONFIG_LOGLEVEL warn

COPY . .

RUN npm install

RUN npm run build --production

CMD ["npm", "start"]

EXPOSE 3000