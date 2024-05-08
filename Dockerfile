FROM node:current-alpine3.16

WORKDIR /app
ADD package.json .
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
CMD ["npm", "start"]