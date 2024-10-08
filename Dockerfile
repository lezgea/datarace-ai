FROM node:20.14.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]