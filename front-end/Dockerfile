FROM node:10.14.2 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
EXPOSE 3000
RUN yarn build
