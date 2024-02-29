FROM node:20-alpine

WORKDIR C:\Users\muhit\OneDrive\Desktop\Dev\HRMS BABoost Bitirme Projesi Front\21-02-24\HMRS\src\App.jsx
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]