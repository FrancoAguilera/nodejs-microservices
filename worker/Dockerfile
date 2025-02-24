FROM node:22

WORKDIR /app

COPY worker/package*.json ./

RUN npm install

COPY worker/ .

RUN npm run build

CMD ["npm", "run", "start"]