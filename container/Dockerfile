# 1. install dependecies
FROM node:lts-alpine as deps

# install tools
RUN apk update
RUN apk add git openssh

# create & set working directory
RUN mkdir /app
WORKDIR /app

# copy
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install --frozen-lockfile

# 2. Rebuild the source code
FROM node:lts-alpine AS builder

ENV NODE_ENV=production
WORKDIR /app
# copy source files
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# 3. Production image, copy all the files and run next
# start app
FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/package.json ./package.json
CMD yarn start