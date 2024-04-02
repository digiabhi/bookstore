const express = require("express");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { AuthRequestMiddlewares } = require("./middlewares");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const app = express();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 30, // Limit each IP to 2 requests per `window` (here, per 15 minutes)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use(
  "/booksService",
  [AuthRequestMiddlewares.checkAuth],
  createProxyMiddleware({
    target: ServerConfig.SEARCH_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/booksService": "/" },
  })
);
app.use(
  "/purchaseService",
  [AuthRequestMiddlewares.checkAuth],
  createProxyMiddleware({
    target: ServerConfig.PURCHASE_SERVICE,
    changeOrigin: true,
  })
);
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
