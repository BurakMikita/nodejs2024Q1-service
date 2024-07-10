FROM node:20.11.1 as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm cache clean --force

FROM node:alpine3.19

WORKDIR /app


COPY --from=build /app /app

EXPOSE $PORT

CMD npx prisma generate dev && npm run start:dev