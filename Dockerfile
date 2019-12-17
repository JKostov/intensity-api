FROM node:12.13.1-alpine3.10

RUN mkdir -p /app/src
WORKDIR /app

RUN apk add \
        python \
        make \
        g++

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm ci

ADD . /app

CMD ["npm", "run", "start:dev"]
