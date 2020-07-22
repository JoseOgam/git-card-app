var path = require("path");
var express = require("express");
var app = express();
var publicPath = path.join(__dirname, "..", "public");
var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Nodejs server is running at port ${port}`);
});
