FROM node:12-alpine AS BUILD_IMAGE
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]