FROM node:slim

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3010

CMD ["npm", "start"]