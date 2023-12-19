# Common build stage
FROM node:16-alpine as common-build-stage

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN npm install -f

# Development build stage
FROM common-build-stage as development-build-stage

CMD [ "npm", "run", "start:local" ]

# Production build stage
FROM common-build-stage as production-build-stage

RUN npm run build:prod

CMD [ "serve", "-s", "build" ]