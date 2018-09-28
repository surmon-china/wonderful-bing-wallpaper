/*
 * @file Main of wonderful-bing-wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */
 
const https = require('https')
const querystring = require('querystring')

/** Class WonderfulBingWallpaper. */
class WonderfulBingWallpaper {

  /**
   * Create a wbw instance.
   * @param {object} options - The instance options.
   */
  constructor(options = {}) {
    this.setOptions(options)
  }

  /**
   * Set the instance new options.
   * @return {instance} The WonderfulBingWallpaper instance.
   */
  setOptions(options) {
    if (this.options) {
      this.options = Object.assign(this.options, options)
    } else {
      this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    }
    return this
  }

  /**
   * Get daily wallpapers story.
   */
  getTodayWallpaperStory() {
    return new Promise((resolve, reject) => {
      const request = https.request({
        port: 443,
        method: 'GET',
        host: this.options.host,
        path: this.options.storyApi
      }, res => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode))
        }
        let body = []
        res.on('data', data => { body.push(data) })
        res.on('end', () => resolve(JSON.parse(Buffer.concat(body).toString())))
      })
      request.on('error', reject)
      request.end()
    })
  }

  /**
   * Get the wallpapers by params.
   * @param {params} size - wallpapers size.
   * @param {params} day - Before days.
   * @param {params} local - The location.
   * @param {params} format - The result doc format.
   */
  getWallpapers(params) {
    return new Promise((resolve, reject) => {

      // query
      const mergeParmas = Object.assign({}, this.options, params)
      const queryParams = {
        n: mergeParmas.size,
        idx: mergeParmas.day,
        format: mergeParmas.format,
        mkt: mergeParmas.local
      }

      // options
      const requestOptions = {
        port: 443,
        method: 'GET',
        host: this.options.host,
        path: this.options.wallpaperApi + '?' + querystring.stringify(queryParams),
      }

      // request
      const request = https.request(requestOptions, res => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode))
        }
        let body = []
        res.on('data', data => { body.push(data) })
        res.on('end', () => {
          body = Buffer.concat(body).toString()
          if (queryParams.format === 'js') {
            body = JSON.parse(body)
          }
          resolve(body.images || body)
        })
      })

      // request
      request.on('error', reject)
      request.end()
    })
  }

  /**
   * Get the humanize wallpapers by original wallpapers.
   * @param {object} wallpaperJson - original wallpapers.
   * @param {string} resolution - wallpaper resolution.
   */
  humanizeWallpapers(wallpaperJson, resolution) {
    resolution = resolution || this.options.resolution
    const doHumanize = image => {
      const host = 'https://' + this.options.host
      let fileFormat = (/\.[^\.]+$/.exec(image.url))
      fileFormat = fileFormat.length ? fileFormat[0] : '.jpg'
      return {
        title: image.title,
        copyright: image.copyright,
        copyrightlink: image.copyrightlink,
        searchUrl: `${host}${image.quiz}`,
        defaultUrl: `${host}${image.url}`,
        humanizeUrl: `${host}${image.urlbase}_${resolution}${fileFormat}`
      }
    }
    if (wallpaperJson instanceof Array) {
      return wallpaperJson.map(doHumanize)
    } else {
      return doHumanize(wallpaperJson)
    }
  }
}

/**
 * Static property.
 * @return {Array} A resolutions array.
 */
WonderfulBingWallpaper.resolutions = [
  '1920x1200',
  '1920x1080',
  '1366x768',
  '1280x768',
  '1024x768',
  '800x600',
  '800x480',
  '768x1280',
  '720x1280',
  '640x480',
  '480x800',
  '400x240',
  '320x240',
  '240x320'
]

/**
 * Default options.
 * @return {Object} A default options.
 */
const DEFAULT_OPTIONS = {
  size: 1,
  day: 0,
  format: 'js',
  local: 'en-US',
  host: 'www.bing.com',
  storyApi: '/cnhp/coverstory/',
  wallpaperApi: '/HPImageArchive.aspx',
  resolution: WonderfulBingWallpaper.resolutions[1]
}

module.exports = WonderfulBingWallpaper
