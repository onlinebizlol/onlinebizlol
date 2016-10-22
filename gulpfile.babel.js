'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import gutil from 'gulp-util';
import colorsSupported from 'supports-color';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';

gulp.task('watch', function() {
  return gulp.src('client/scripts/js/main.js')
    .pipe(webpackStream(webpackConfig, webpack, function(err, stats) {
      if(err)  {
        throw new gutil.PluginError("webpack", err);
      }

      gutil.log("[webpack]\n" + stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true
      }));
    }))
    .pipe(gulp.dest('assets/'));
});

gulp.task('serve', function(callback) {
  // modify some webpack config options
  var devConfig = Object.create(webpackConfig);
  devConfig.devServer = {
    inline: true
  };

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(devConfig), {
    publicPath: devConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }

    gutil.log("[webpack-dev-server]", "http://localhost:8080");
  });
});

gulp.task('default', ['serve']);
