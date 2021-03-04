FROM node:alpine

# create & set working directory
RUN mkdir /app
WORKDIR /app

# copy source files
COPY . /app

# install dependencies
RUN yarn

# start app
RUN yarn build
EXPOSE 7009
CMD yarn start