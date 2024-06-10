FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Optimiza el despliegue
ENV NODE_ENV=production 

EXPOSE 3000

CMD ["npm", "start"]
