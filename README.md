            FROM node:18-alpine
            WORKDIR /app
            COPY package*.json ./
            RUN npm install
            COPY . .
            EXPOSE 3000
            CMD ["node", "server.js"]




            FROM node:18
            WORKDIR /app
            COPY package*.json ./
            RUN npm install
            COPY . .
            RUN npx prisma generate
            EXPOSE 3000
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
