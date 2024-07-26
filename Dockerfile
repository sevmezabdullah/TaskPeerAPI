# Base image olarak Node.js kullanıyoruz
FROM node:18-alpine

# Uygulama için çalışma dizini oluşturuyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarını çalışma dizinine kopyalıyoruz
COPY package*.json ./

# Uygulamanın bağımlılıklarını yüklüyoruz
RUN npm install --force

# Tüm dosyaları çalışma dizinine kopyalıyoruz
COPY . .

# Veritabanı işlemlerini ve migration işlemlerini gerçekleştiriyoruz
RUN npm run db:generate
RUN npm run db:migrate
RUN npm run db:push

# PM2 ile uygulamayı başlatıyoruz
CMD ["pm2-runtime", "start", "src/index.ts", "--name", "taskpeerapi"]
