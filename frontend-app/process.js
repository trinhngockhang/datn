module.exports = {
  script: "serve",
  env: {
    PM2_SERVE_PATH: "./out",
    PM2_SERVE_PORT: 4000,
    PM2_SERVE_SPA: "true",
    PM2_SERVE_HOMEPAGE: "./out/index.html",
  },
};
