FROM node:20

RUN mkdir -p usr/app/
WORKDIR /usr/app

COPY ./ ./

RUN yarn
RUN yarn run build

EXPOSE 3000
CMD [ "yarn", "start" ]