FROM node:16.13.2

WORKDIR '/FoodPortalBackend'

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]