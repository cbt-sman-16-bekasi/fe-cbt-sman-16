# Gunakan image Node.js sebagai base
FROM node:20 AS build

# Set working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json untuk menginstal dependensi
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy semua kode proyek ke dalam container
COPY . .

# Build aplikasi React
RUN npm run build

# Gunakan image Nginx untuk serving React build
FROM nginx:alpine

# Copy hasil build dari tahap sebelumnya ke Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 untuk akses HTTP
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
