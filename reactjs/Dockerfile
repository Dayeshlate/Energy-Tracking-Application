FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install 

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g serve

CMD ["serve","-s","dist","-l","5173"]
