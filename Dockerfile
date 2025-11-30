FROM node:20-alpine
LABEL version="1.0.0" description="Veritas API" maintainer="Veritas"
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/src/main"]
