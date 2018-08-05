// This script change webpack-configs for "ng serve"
const fs = require('fs');
const f_angular = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

const newConfig = ` target: "electron-renderer",
                    externals: {
                        electron: "require('electron')",
                        buffer: "require('buffer')",
                        child_process: "require('child_process')",
                        crypto: "require('crypto')",
                        events: "require('events')",
                        fs: "require('fs')",
                        http: "require('http')",
                        https: "require('https')",
                        assert: "require('assert')",
                        dns: "require('dns')",
                        net: "require('net')",
                        os: "require('os')",
                        path: "require('path')",
                        querystring: "require('querystring')",
                        readline: "require('readline')",
                        repl: "require('repl')",
                        stream: "require('stream')",
                        string_decoder: "require('string_decoder')",
                        url: "require('url')",
                        util: "require('util')",
                        zlib: "require('zlib')",
                        ffi: "require('ffi')",
                        typeorm: "require('typeorm')",
                        sqlite3: "require('sqlite3')",
                        commonjs: "require('commonjs')"
                    },
                    resolve: { // see: http://webpack.github.io/docs/configuration.html#resolve
                        alias: {
                            typeorm: path.resolve(__dirname, "../node_modules/typeorm/typeorm-model-shim")
                        }
                    },`;

fs.readFile(f_angular, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(new RegExp(newConfig, "g"), '');
  var result = result.replace(/target: "web",/g, '');
  var result = result.replace(/return \{/g, 'return {' + newConfig);

  fs.writeFile(f_angular, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});