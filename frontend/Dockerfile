FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@latest && npm install

COPY . .

RUN ng build --configuration production

FROM nginx:alpine

COPY --chown=nginx:nginx --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx directly
CMD ["nginx", "-g", "daemon off;"]
