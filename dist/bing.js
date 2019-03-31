'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var https = require('https');
var querystring = require('querystring');

var WonderfulBingWallpaper = function () {
  function WonderfulBingWallpaper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WonderfulBingWallpaper);

    this.setOptions(options);
  }

  _createClass(WonderfulBingWallpaper, [{
    key: 'setOptions',
    value: function setOptions(options) {
      if (this.options) {
        this.options = Object.assign(this.options, options);
      } else {
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
      }
      return this;
    }
  }, {
    key: 'getWallpapers',
    value: function getWallpapers(params) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var mergeParmas = Object.assign({}, _this.options, params);
        var queryParams = {
          n: mergeParmas.size,
          idx: mergeParmas.day,
          format: mergeParmas.format,
          mkt: mergeParmas.local,
          ensearch: mergeParmas.ensearch,
          pid: 'hp'
        };

        var requestOptions = {
          port: 443,
          method: 'GET',
          host: _this.options.host,
          path: _this.options.wallpaperApi + '?' + querystring.stringify(queryParams)
        };

        var request = https.request(requestOptions, function (res) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error('WonderfulBingWallpaper getWallpapers error: statusCode=' + res.statusCode));
          }
          var body = [];
          res.on('data', function (data) {
            body.push(data);
          });
          res.on('end', function () {
            body = Buffer.concat(body).toString();
            if (queryParams.format === 'js') {
              body = JSON.parse(body);
            }
            resolve(body.images || body);
          });
        });

        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'humanizeWallpapers',
    value: function humanizeWallpapers(wallpaperJson, resolution) {
      var _this2 = this;

      resolution = resolution || this.options.resolution;
      var doHumanize = function doHumanize(image) {
        var host = 'https://' + _this2.options.host;
        var fileFormat = /\.[^\.]+$/.exec(image.url);
        fileFormat = fileFormat.length ? fileFormat[0] : '.jpg';
        return {
          title: image.title,
          bsTitle: image.bsTitle,
          caption: image.caption,
          desc: image.desc,
          date: image.date,
          copyright: image.copyright,
          copyrightonly: image.copyrightonly,
          copyrightlink: image.copyrightlink,
          searchUrl: '' + host + image.quiz,
          defaultUrl: '' + host + image.url,
          humanizeUrl: '' + host + image.urlbase + '_' + resolution + fileFormat
        };
      };
      if (wallpaperJson instanceof Array) {
        return wallpaperJson.map(doHumanize);
      } else {
        return doHumanize(wallpaperJson);
      }
    }
  }]);

  return WonderfulBingWallpaper;
}();

WonderfulBingWallpaper.resolutions = ['1920x1200', '1920x1080', '1366x768', '1280x768', '1024x768', '800x600', '800x480', '768x1280', '720x1280', '640x480', '480x800', '400x240', '320x240', '240x320'];

var DEFAULT_OPTIONS = {
  size: 1,
  day: 0,
  format: 'js',
  ensearch: 0,
  local: 'en-US',
  host: 'www.bing.com',
  wallpaperApi: '/HPImageArchive.aspx',
  resolution: WonderfulBingWallpaper.resolutions[1]
};

module.exports = WonderfulBingWallpaper;