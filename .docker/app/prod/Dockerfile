FROM node:9.11.2-alpine as builder

# add app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Add phantomjs
RUN wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C / \
    && npm config set user 0 \
    && npm install -g phantomjs-prebuilt

RUN apk update \
 && apk add --no-cache --virtual .build-deps \
        libstdc++ \
        binutils-gold \
        curl \
        g++ \
        gcc \
        gnupg \
        libgcc \
        linux-headers \
        make \
        python

RUN npm install -g --quiet node-gyp && npm install --quiet && npm install -g @angular/cli

ENV NODE_ENV production
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install dependencies run build
RUN npm run build

FROM nginx:1.15.1-alpine
COPY ./.docker/app/prod/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app /usr/share/nginx/html
