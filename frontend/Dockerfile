FROM node:16.13.2

WORKDIR '/FoodPortalFrontend'

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]