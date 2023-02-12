const express = require("express");
const appRoutes = require("./routes/appRoutes");
const app = express();

app.use(express.json());
app.use(appRoutes);

app.listen(3000, () => {
  console.log("Backend up and running");
});
