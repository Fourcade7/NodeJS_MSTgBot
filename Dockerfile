# 1. Node.js asosidagi rasmni olamiz
FROM node:23-alpine


# 2. Konteyner ichida ishchi papka yaratamiz
WORKDIR /app

# 3. Faqat package fayllarni avval ko‘chiramiz
COPY package*.json ./

# 4. Kutubxonalarni o‘rnatamiz
RUN npm install

# 5. Endi butun loyihani konteynerga ko‘chiramiz
COPY . .

# 6. Tashqi portni ochamiz
EXPOSE 3000

# 7. Konteyner ishga tushganda bajariladigan buyruq
CMD ["node", "server.js"]
