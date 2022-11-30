FROM node:19.2.0-alpine3.15
WORKDIR /usr/src/app
COPY . .
EXPOSE 2048
RUN npm ci --production && npm cache clean --force
CMD ["node", "app.js"]