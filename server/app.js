const express = require("express");
const appRoutes = require("./routes/appRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(appRoutes);

app.listen(3000, () => {
  console.log("Backend up and running");
});
