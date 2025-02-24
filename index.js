require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const router = require("./routes/taskRoute");
const app = express();

const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use("/taskManager", router);

app.listen(PORT, () => {
  console.log(`App is listening`);
});
