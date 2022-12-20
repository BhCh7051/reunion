FROM node:12-alpine
Create the app directory

WORKDIR /usr/src/app
Install dependencies

COPY package*.json ./ 
RUN npm install
Copy the source code

COPY . .
Expose the app's port

EXPOSE 3000
Start the app

CMD ["node", "app.js"]

