# Etap 1: Budowanie aplikacji Angular
FROM node:18 AS build

# Ustawienie katalogu roboczego
#WORKDIR /app
WORKDIR /usr/src/app

# Kopiowanie plików package.json i package-lock.json (jeśli istnieje)
COPY package*.json ./

# Instalacja zależności
RUN npm ci

# Instalacja Angular CLI
RUN npm install -g @angular/cli

# Kopiowanie całej aplikacji
COPY . .

# Budowanie aplikacji Angular dla środowiska produkcyjnego
RUN npm run build --configuration=production

# Etap 2: Serwowanie aplikacji za pomocą Nginx
FROM nginx:latest

# Kopiowanie niestandardowego pliku konfiguracji Nginx (opcjonalne)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Kopiowanie builda Angulara do katalogu Nginx
COPY --from=build /usr/src/app/dist/studweb-ui/browser /usr/share/nginx/html

# Eksponowanie portu
EXPOSE 80 4200

