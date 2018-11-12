# base image
FROM node:9.6.1

# set working directory
RUN mkdir /opt/app
RUN chown node:node /opt/app
WORKDIR /opt/app

USER node

ENV PATH /opt/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /opt/app/package.json
RUN npm install

# start app
CMD ["npm", "run-script", "build"]

