/*
 * @file main of wonderful-bing-wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */
 
const https = require('https')
const querystring = require('querystring')

/** Class representing a point. */
class WonderfulBingWallpaper {

  /**
   * Create a wbdw instance.
   * @param {object} options - The instance options.
   */
  constructor(options = {}) {
    this.setOptions(options)
    return this
  }

  /**
   * Set the instance new options.
   * @return {instance} The WonderfulBingWallpaper instance.
   */
  setOptions(options) {
    if (this.options) {
      this.options = Object.assign(this.options, options)
    } else {
      this.options = Object.assign({}, DEFAULT_CONFIG, options)
    }
    return this
  }

  /**
   * Get the wallpapers by params.
   * @param {params} n - wallpapers size.
   * @param {params} idx - Before days.
   * @param {params} mkt - The location.
   * @param {params} format - The result doc format.
   */
  getWallpapers(params) {
    return new Promise((resolve, reject) => {

      // query
      const query = Object.assign({}, this.options, params)
      delete query.host
      delete query.path
      delete query.resolution

      // options
      const options = {
        port: 443,
        method: 'GET',
        host: DEFAULT_CONFIG.host,
        path: DEFAULT_CONFIG.path + '?' + querystring.stringify(query),
      }

      // request
      const request = https.request(options, res => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode))
        }
        let body = []
        res.on('data', data => { body.push(data) })
        res.on('end', () => {
          try {
            const result = Buffer.concat(body).toString()
            if (query.format === 'js') {
              body = JSON.parse(result)
            } else {
              body = result
            }
          } catch(e) {
            reject(e)
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
   * @param {object} wallPaperJson - original wallpapers.
   * @param {string} _resolution - wallpaper resolution.
   */
  humanizeWallpapers(wallPaperJson, _resolution) {
    const host = 'https://' + this.options.host
    const resolution = _resolution || this.options.resolution
    const doHumanize = image => {
      let fileFormat = (/\.[^\.]+$/.exec(image.url))
      fileFormat = fileFormat.length ? fileFormat[0] : '.jpg'
      return {
        title: image.title,
        copyright: image.copyright,
        copyrightlink: image.copyrightlink,
        defaultUrl: `${host}${image.url}`,
        searchUrl: `${host}${image.quiz}`,
        url: `${host}${image.urlbase}_${resolution}${fileFormat}`
      }
    }
    if (wallPaperJson instanceof Array) {
      return wallPaperJson.map(doHumanize)
    } else {
      return doHumanize(wallPaperJson)
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
 * Default config.
 * @return {Object} A default config.
 */
const DEFAULT_CONFIG = {
  n: 1,
  idx: 0,
  format: 'js',
  mkt: 'en-US',
  host: 'www.bing.com',
  path: '/HPImageArchive.aspx',
  resolution: WonderfulBingWallpaper.resolutions[0]
}

module.exports = WonderfulBingWallpaper
