const path = require("path");

console.log("WEPACK");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.[hash].js",
  },
};
