FROM node:22.9.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --silent --unsafe-perm=true
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.23.4-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/angular-lotto/browser /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
