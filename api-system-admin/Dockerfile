FROM node:12.18
ENV NODE_ENV production
ENV PORT=5001
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
RUN npm install babel -g
COPY ./ ./
EXPOSE 5001
RUN npm run build
CMD ["node", "dist"]