FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run the angular dev server exposed to 0.0.0.0
EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
