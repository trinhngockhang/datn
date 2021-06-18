FROM node:12.18
ENV NODE_ENV production
ENV PORT=3002
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
RUN npm install babel -g
COPY ./ ./
EXPOSE 3002
RUN npm run build
CMD ["node", "dist"]