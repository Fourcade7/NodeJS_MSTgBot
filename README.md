FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]



# 1. Bazaviy image
FROM node:18

# 2. Ishchi papka
WORKDIR /app

# 3. package.json fayllarni ko‘chir
COPY package*.json ./

# 4. Kutubxonalarni o‘rnatish
RUN npm install

# 5. Prisma fayllarini va kodni ko‘chir
COPY . .

# 6. Prisma client generatsiya qilish
RUN npx prisma generate

# 7. Portni ochish
EXPOSE 3000

# 8. Appni ishga tushirish
CMD ["npm", "start"]



docker build -t tgimage .
docker run -p 3000:3000 tgimage //def name
docker run --name mytgcon -p 3000:3000 tgimage //con name

docker run --name myapp-container -p 3000:3000 tgimage




docker ps
docker ps -a



docker stop myapp-container
docker start myapp-container
docker logs myapp-container
docker rm myapp
docker rmi tgimage
