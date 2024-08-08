const db = require("../config/connection");

db.once("open", async () => {
  console.log("all done!");
  process.exit(0);
});
