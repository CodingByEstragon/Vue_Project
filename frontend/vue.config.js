// const { defineConfig } = require("@vue/cli-service");

// module.exports = defineConfig({
//   transpileDependencies: true,

//   // 👇 Hier fügst du den Proxy hinzu
//   devServer: {
//     proxy: "http://localhost:3001",
//   },

//   chainWebpack: (config) => {
//     config.module
//       .rule("images")
//       .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
//       .type("asset")
//       .use("url-loader")
//       .loader("url-loader")
//       .options({
//         limit: 4096,
//         name: "img/[name].[hash:8].[ext]",
//       });
//   },
// });
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: "http://localhost:3001",
  },

  chainWebpack: (config) => {
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .type("asset") // ✅ Webpack 5 integrierte Lösung
      .set("generator", {
        filename: "img/[name].[hash:8][ext]",
      });
  },
});
