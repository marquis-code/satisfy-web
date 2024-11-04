FROM node:20-alpine as node-base
# FROM node:18.17.1-alpine3.17 as node-base

RUN apk add --no-cache git

# Set Environment variables
ENV NPM_CONFIG_PREFIX=/home/node/.npm
ENV PATH=$PATH:/home/node/.npm/bin 
    #GA_TRACKING_ID=$GA_TRACKING_ID \
    #VITE_HOMEPOD_BASE_URL=$VITE_HOMEPOD_BASE_URL \
    #VITE_STORIPOD_BASE_URL=$VITE_STORIPOD_BASE_URL \
    #VITE_MAX_CHARACTER_COUNT=$VITE_MAX_CHARACTER_COUNT


RUN mkdir -p  "${HOME}/app" \
              "${NPM_CONFIG_PREFIX}/bin"

RUN printf  "Node version %s, npm version %s, yarn version %s\n\n" \
            "$(node -v)" "$(npm -v)" "$(yarn -v)"

WORKDIR /app
#COPY --chown=node:node . .
COPY . .
RUN yarn install
RUN yarn run build

#FROM dependencies as development
#USER node
EXPOSE 3000
CMD ["yarn", "start"]