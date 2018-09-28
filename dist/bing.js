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
    key: 'getTodayWallpaperStory',
    value: function getTodayWallpaperStory() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = https.request({
          port: 443,
          method: 'GET',
          host: _this.options.host,
          path: _this.options.storyApi
        }, function (res) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error('statusCode=' + res.statusCode));
          }
          var body = [];
          res.on('data', function (data) {
            body.push(data);
          });
          res.on('end', function () {
            return resolve(JSON.parse(Buffer.concat(body).toString()));
          });
        });
        request.on('error', reject);
        request.end();
      });
    }
  }, {
    key: 'getWallpapers',
    value: function getWallpapers(params) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var mergeParmas = Object.assign({}, _this2.options, params);
        var queryParams = {
          n: mergeParmas.size,
          idx: mergeParmas.day,
          format: mergeParmas.format,
          mkt: mergeParmas.local
        };

        var requestOptions = {
          port: 443,
          method: 'GET',
          host: _this2.options.host,
          path: _this2.options.wallpaperApi + '?' + querystring.stringify(queryParams)
        };

        var request = https.request(requestOptions, function (res) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error('statusCode=' + res.statusCode));
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
      var _this3 = this;

      resolution = resolution || this.options.resolution;
      var doHumanize = function doHumanize(image) {
        var host = 'https://' + _this3.options.host;
        var fileFormat = /\.[^\.]+$/.exec(image.url);
        fileFormat = fileFormat.length ? fileFormat[0] : '.jpg';
        return {
          title: image.title,
          copyright: image.copyright,
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
  local: 'en-US',
  host: 'www.bing.com',
  storyApi: '/cnhp/coverstory/',
  wallpaperApi: '/HPImageArchive.aspx',
  resolution: WonderfulBingWallpaper.resolutions[1]
};

module.exports = WonderfulBingWallpaper;