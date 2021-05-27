# 1. Install dependencies
FROM node:lts-alpine AS deps

# install tools
RUN apk update
RUN apk add git openssh

# create & set working directory
RUN mkdir /app
WORKDIR /app

# copy source files
COPY . .

# install dependencies
RUN yarn install --frozen-lockfile