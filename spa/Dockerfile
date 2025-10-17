FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration=production

FROM nginx:1.25-alpine

COPY --from=build /app/dist/spa /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
