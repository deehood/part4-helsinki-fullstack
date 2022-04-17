const app = require("./app");
const config = require("./utils/config");
const http = require("http");
const logger = require("./utils/logger");

// express cant handle https and http can add optional parameters to the server
http.createServer(app);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
