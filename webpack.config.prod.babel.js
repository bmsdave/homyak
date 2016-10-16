import config from './webpack.config.babel';
import path from 'path';
import webpack from 'webpack';

let configProd = config;

configProd.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: __dirname
};

configProd.plugins = configProd.plugins.concat([

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);

export default configProd;
