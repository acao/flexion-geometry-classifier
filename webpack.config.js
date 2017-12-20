const config = {
  entry: "./src/web.js",
  output: {
    filename: "web.js",
    path: __dirname + "/dist",
    libraryTarget: "var",
    library: "[name]"
  },
  module: {
    rules: [
      // the 'transform-runtime' plugin tells babel to require the runtime
      // instead of inlining it.
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions", "safari >= 7"]
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

module.exports = config;
