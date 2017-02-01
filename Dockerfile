FROM node:7.4.0

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
RUN npm install

EXPOSE 4005

COPY src /app/src

ENV MONGO_HOST mongo
ENV REDIS_HOST redis

CMD ["/bin/bash","-c","node","/app/src/main.js"]
