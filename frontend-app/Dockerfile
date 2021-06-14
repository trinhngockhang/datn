FROM node:12.18
ENV NODE_ENV production
ENV PORT=4000
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
RUN npm install pm2 -g
COPY ./ ./
EXPOSE 4000
RUN npm run build
CMD ["pm2", "serve", "/out", "4000", "--spa"]
