FROM node:8.12.0-alpine

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3000

CMD npm start