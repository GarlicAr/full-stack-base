FROM node:20-alpine

WORKDIR /app

COPY resources/frontend/package*.json ./
RUN npm ci

COPY resources/frontend .

ENV CHOKIDAR_USEPOLLING=true
EXPOSE 5173

CMD ["npm","run","dev","--","--host","0.0.0.0"]
