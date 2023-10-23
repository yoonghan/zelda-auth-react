const { merge } = require('webpack-merge')
const singleSpaDefaults = require('webpack-config-single-spa-react-ts')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'walcron',
    projectName: 'zelda-auth-react',
    webpackConfigEnv,
    argv,
  })

  const additionalConfigs = webpackConfigEnv.standalone
    ? {}
    : {
        plugins: [
          new HtmlWebpackPlugin({
            inject: false,
            template: 'src/about.ejs',
            filename: 'index.html',
          }),
        ],
      }

  return merge(defaultConfig, additionalConfigs)
}
