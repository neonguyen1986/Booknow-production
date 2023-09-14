FROM node:14-alpine
#alpine:version of node to resize the size of Node
# Create app directory

WORKDIR /booknow/backend
# create the working directory in Docker

COPY package*.json ./
#copy package... to Docker root ./

RUN npm install
RUN npm install -g @babel/core @babel/cli
#-g install babel globaly

COPY . .
#Copy all the rest files to Docker to /booknow/backend (second dot)
#Copy should in this step after run all install from package.json

RUN npm run build-src
#Docker will build by itseft, this is the reason why "build" should put inside .dockerignore

CMD [ "npm", "run", "build" ]

#docker build --tag node-docker . 
#meaning: build current node with name node-docker at .: root of Docker

#docker run -p 8080:8080 -d node-docker