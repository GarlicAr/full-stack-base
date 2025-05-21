FROM node:20-alpine
WORKDIR /app

COPY web/package*.json ./
RUN npm ci

COPY web .
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
