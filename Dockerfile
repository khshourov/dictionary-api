# Production build of React UI
FROM node:22-alpine AS build_ui

WORKDIR /usr/src/app

COPY --chown=node:node views/interactivity/package.json views/interactivity/yarn.lock .

RUN yarn install --frozen-lockfile

COPY --chown=node:node views/interactivity/ .

RUN yarn build

ENV NODE_ENV=production

RUN yarn install --frozen-lockfile --production && yarn cache clean

USER node

# Production build of Backend
FROM node:22-alpine AS build_backend

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock .

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV=production

RUN yarn install --frozen-lockfile --production && yarn cache clean

USER node

# Production
FROM node:22-alpine AS production

WORKDIR /app

COPY --chown=node:node --from=build_ui /usr/src/app/build/static/js ./public/js
COPY --chown=node:node --from=build_ui /usr/src/app/build/static/css ./public/css
COPY --chown=node:node --from=build_ui /usr/src/app/build/static/media ./public/media
COPY --chown=node:node --from=build_ui /usr/src/app/build/asset-manifest.json ./public/
COPY --chown=node:node --from=build_backend /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build_backend /usr/src/app/dist ./dist
COPY --chown=node:node --from=build_backend /usr/src/app/views/index.hbs ./views/

CMD [ "node", "dist/main" ]
