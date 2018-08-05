// This script change webpack-configs for "ng serve"
const fs = require('fs');
const f_angular = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';
const {electronConfig, webConfig}  = require('./postinstall.config');

fs.readFile(f_angular, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(new RegExp(electronConfig, "g"), '');
  var result = data.replace(new RegExp(webConfig, "g"), '');
  var result = result.replace(/target: "web",/g, '');
  var result = result.replace(/return \{/g, 'return {' + electronConfig);

  fs.writeFile(f_angular, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});