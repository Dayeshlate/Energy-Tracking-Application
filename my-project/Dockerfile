FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

ENV VITE_API_BASE_URL=http://localhost:8080

RUN npm install -g serve

EXPOSE 5173

CMD ["serve","-s","dist","-l","5173"]

