const path = require("path");

console.log("WEPACK");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash].js",
  },
};
