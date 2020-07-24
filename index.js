require("dotenv").config();

const server = require("./api/server.js");

if (!module.parent) {
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
}
module.exports = server;