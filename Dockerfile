# Common build stage
FROM node:18-buster-slim as common-build-stage

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN npm install -f

# Development build stage
FROM common-build-stage as development-build-stage

CMD [ "npm", "run", "start" ]

# Production build stage
FROM common-build-stage as production-build-stage

RUN npm run build

CMD [ "serve", "-s", "build" ]