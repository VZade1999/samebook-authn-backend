FROM --platform=linux/amd64 node AS builder
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 80
ENV NODE_ENV qa
CMD ["node", "dist/main.js"]