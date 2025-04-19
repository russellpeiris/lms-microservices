FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV VITE_GATEWAY_API=api
RUN npm run build
EXPOSE 5173
CMD [ "npm", "run", "preview" ]