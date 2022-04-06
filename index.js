const app = require("./app");
const config = require("./utils/config");
const http = require("http");
const logger = require("./utils/logger");

// app.use(express.static("build"));

const server = http.createServer(app);

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
