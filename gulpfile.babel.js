import gulp         from 'gulp';
import path         from 'path';
import gutil        from 'gulp-util';
import del          from 'del';
import webpack      from 'webpack';
import serve        from 'browser-sync';

import yargs        from 'yargs';
import template     from 'gulp-template';
import rename       from 'gulp-rename';

import historyApiFallback   from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import bootstrapEntryPoints from './webpack.config.bootstrap.babel';

console.log('=> bootstrap-loader configuration: ' + bootstrapEntryPoints.dev);

// TODO add awesome logic checkout from develop to produoction
// import configProd from './webpack.config.prod.babel';
import configDev from './webpack.config.dev.babel';


const root = './';

const rootDev = './app_client_side';

// map of all paths
const paths = {
  server: {
    baseDir: rootDev
  },
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'app_client_side/', 'index.js'),
    bootstrapEntryPoints.dev
  ],
  dest: __dirname,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**')

  // js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  // styl: resolveToApp('**/*.scss'), // stylesheets
  // html: [
  //   resolveToApp('**/*.html'),
  //   path.join(root, 'index.html')
  // ],
  // entry: [
  //   'babel-polyfill',
  //   path.join(__dirname, root, 'app/app.js'),
  //   bootstrapEntryPoints.dev
  // ],
  // output: root,
  // blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  // dest: path.join(__dirname, 'dist')
};


gulp.task('default', ['watch']);
gulp.task('watch', ['serve']);

gulp.task('serve', () => {
  configDev.entry.app = [

    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true'
  ].concat(paths.entry);
  let compiler = webpack(configDev);
  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: paths.server,
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: configDev.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  });
});

// use webpack.config.js to build modules
gulp.task('webpack', [], (cb) => {
  configProd.entry.app = paths.entry;

  webpack(configProd, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('clean', (cb) => {
  // del([paths.dest]).then((cleanPaths) => {
  //   gutil.log('[clean]', cleanPaths);
  //   cb();
  // });
});


// helper method for resolving paths
// var resolveToApp = function (glob = '') {
//   return path.join(root, 'app', glob); // app/{glob}
// };

const resolveToComponents = function (glob = '') {
  return path.join('app_client_side/app/component', glob); // app/component/{glob}
};


gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});
