/**
 * @file WonderfulBingWallpaper Class
 * @author Surmon <https://github.com/surmon-china>
 */

import https from 'https'
import querystring from 'querystring'

// https://www.bing.com/HPImageArchive.aspx?format=js&n=1&pid=hp&ensearch=0
// https://www.bing.com/HPImageArchive.aspx?format=js&n=1&pid=hp&ensearch=1

/**
 * Resolutions constant.
 */
const RESOLUTIONS = [
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
 * Bing data dormat.
 */
enum DataFormt {
  JSON = 'js',
  XML = 'xml',
  RSS = 'rss',
}

/**
 * Default options.
 * @return {Object} A default options.
 */
const DEFAULT_OPTIONS = Object.freeze({
  size: 1,
  day: 0,
  format: DataFormt.JSON as string,
  ensearch: 0,
  local: 'en-US',
  host: 'www.bing.com',
  wallpaperApi: '/HPImageArchive.aspx',
  resolution: RESOLUTIONS[1]
})

type WonderfulBingWallpaperOption = Partial<typeof DEFAULT_OPTIONS>
type GetWallpapersParams = Pick<WonderfulBingWallpaperOption, 'size' | 'day' | 'local' | 'format'>

export default class WonderfulBingWallpaper {

  options: WonderfulBingWallpaperOption = DEFAULT_OPTIONS

  constructor(options: WonderfulBingWallpaperOption = {}) {
    this.setOptions(options)
  }

  /**
   * Set the instance new options.
   * @param {options} The WonderfulBingWallpaper options.
   */
  setOptions(options: WonderfulBingWallpaperOption) {
    this.options = {
      ...this.options,
      ...options
    }
  }

  /**
   * Get the wallpapers by params.
   * @param {params} size - wallpapers size.
   * @param {params} day - Before days.
   * @param {params} local - The location.
   * @param {params} format - The result doc format.
   */
  getWallpapers(params?: GetWallpapersParams): any {
    return new Promise((resolve, reject) => {
      // params
      const mergeParmas = {
        ...this.options,
        ...params
      }
      const queryParams = {
        n: mergeParmas.size,
        idx: mergeParmas.day,
        format: mergeParmas.format,
        mkt: mergeParmas.local,
        ensearch: mergeParmas.ensearch,
        pid: 'hp'
      }

      // options
      const requestOptions = {
        port: 443,
        method: 'GET',
        host: this.options.host,
        path: this.options.wallpaperApi + '?' + querystring.stringify(queryParams),
      }

      // request
      const request = https.request(requestOptions, response => {
        const { statusCode } = response
        if (statusCode && (statusCode < 200 || statusCode >= 300)) {
          return reject(new Error(`WonderfulBingWallpaper getWallpapers error: statusCode=${statusCode}`))
        }
        let body: any = []
        response.on('data', data => { body.push(data) })
        response.on('end', () => {
          body = Buffer.concat(body).toString()
          if (queryParams.format === DataFormt.JSON) {
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
  humanizeWallpapers(wallpaperJson: any | any[], resolution?: string) {
    const targetResolution = resolution || this.options.resolution
    const doHumanize = (image: any) => {
      const host = 'https://' + this.options.host
      const fileFormat = (/\.[^\.]+$/.exec(image.url))
      const targetFileFormat = fileFormat?.length ? fileFormat?.[0] : '.jpg'
      return {
        ...image,
        humanizedSearchUrl: `${host}${image.quiz}`,
        humanizedImageUrl: `${host}${image.url}`,
        humanizeResolutionUrl: `${host}${image.urlbase}_${targetResolution}${targetFileFormat}`
      }
    }

    return Array.isArray(wallpaperJson)
      ? wallpaperJson.map(doHumanize)
      : doHumanize(wallpaperJson)
  }

  /**
   * Static function.
   * @return {Array} A resolutions array.
   */
  static getResolutions() {
    return RESOLUTIONS
  }
}
