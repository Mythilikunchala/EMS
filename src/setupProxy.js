const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.29.60', // Replace with the URL of your ASP.NET Core API
      changeOrigin: true,
    })
  );

  // Add a specific proxy for the login endpoint
  app.use(
    '/api/Auth/login',
    createProxyMiddleware({
      target: 'http://192.168.29.60',
      changeOrigin: true,
    })
  );
};
