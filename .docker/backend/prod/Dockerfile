FROM node:9.11.2-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install json-server --save-dev


COPY ./server.js /usr/src/app/server.js
COPY ./raw_data.json /usr/src/app/db.json

EXPOSE 3030

CMD [ "node", "server.js" ]


