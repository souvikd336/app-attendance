const app = require("./app");
const connectwithdb = require("./database/connection");
require("dotenv").config();

// connect with databases
connectwithdb();

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
  });