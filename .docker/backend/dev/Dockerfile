FROM node:9.6.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install json-server --save-dev

COPY ./raw_data.json /usr/src/app/db.json

CMD [ "node_modules/.bin/json-server", "raw_data.json -p3030" ]





