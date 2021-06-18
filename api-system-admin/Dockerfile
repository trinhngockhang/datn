FROM node:12.18
ENV NODE_ENV production
ENV PORT=3004
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
RUN npm install babel -g
COPY ./ ./
EXPOSE 3004
RUN npm run build
CMD ["node", "dist"]