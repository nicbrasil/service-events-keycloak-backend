FROM node
ENV NODE_MODULE_PATH=/app/dependencies
ENV NODE_PATH=$NODE_MODULE_PATH/node_modules
RUN npm config set prefix $NODE_MODULE_PATH

RUN mkdir -p /app/dependencies
COPY package.json  ./
RUN npm i --verbose

WORKDIR /app/source
COPY . .

RUN npm run build