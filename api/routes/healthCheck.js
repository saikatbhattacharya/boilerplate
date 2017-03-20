exports.bind = (app, redisClient) => {
  app.use('/health_check', (req, res) => {
    const pingTimer = setTimeout(() => res.sendStatus(503), 1000);
    redisClient.ping((err) => {
      const statusCode = err ? 503 : 200;
      clearTimeout(pingTimer);
      res.sendStatus(statusCode);
    });
  });
};
