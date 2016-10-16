import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

// import StatsPlugin from 'stats-webpack-plugin';

const srcDirname = path.resolve(__dirname, 'app_client_side/');
const dstDirname = __dirname;

process.stdout.write(`webpack src_dirname: ${srcDirname}\n`);
process.stdout.write(`webpack dst_dirname: ${dstDirname}\n`);

const config = {
  devtool: 'source-map',
  entry: {},
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: "style!css"},
      {test: /\.(scss|sass)$/, loaders: ['style', 'css', 'postcss', 'sass']}
    ]
  },
  plugins: [

    // Use for analytic build http://webpack.github.io/analyse/#hints
    // new StatsPlugin('stats.json', {
    //   chunkModules: true
    // }),

    // new webpack.ProvidePlugin({
    //   'angular': 'angular'
    // }),

    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: `${srcDirname}/index.html`,
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure,
    // consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.resource && module.resource.indexOf(path.resolve(srcDirname)) === -1;
      }
    })
  ],

  postcss: [autoprefixer]

  // externals: {
  //   'stickyfill': 'stickyfill'
  // }
  // profile: true

};

export default config;
