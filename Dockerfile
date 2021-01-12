FROM node:14.15.1-alpine3.10 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /var/app
COPY --from=build /app/build ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

