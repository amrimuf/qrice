FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

RUN npm install -g sequelize-cli

# ⚠️Set the environment variable to control seeding during migration
ENV RUN_SEED=false

RUN sequelize db:migrate
RUN sequelize db:seed:all
