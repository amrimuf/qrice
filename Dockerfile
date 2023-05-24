FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

RUN npm install -g sequelize-cli

RUN sequelize db:migrate
RUN sequelize db:seed:all
