# Build image and prepare everything for production
FROM oraclelinux:7-slim As BUILD_IMAGE

RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
     yum-config-manager --disable ol7_developer_EPEL && \
     yum -y install oracle-instantclient19.3-basiclite nodejs curl bash make && \
     rm -rf /var/cache/yum

WORKDIR /usr/src/app

COPY . .

RUN npm install npm@8.12.2 \
 && npm install -g ts-node \
 && npm install -g yarn \
 && npm install \
 && npm run build \
 && npm prune --production \
 && npm audit

# Make a production
FROM oraclelinux:7-slim

USER node

RUN mkdir -p /home/node/app/node_modules \
 && mkdir -p /home/node/app/dist \
 && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --from=BUILD_IMAGE /usr/src/app/dist /home/node/app/dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules /home/node/app/node_modules

EXPOSE 3008

ENTRYPOINT ["node"]

CMD ["/home/node/app/dist/src/main.js"]
