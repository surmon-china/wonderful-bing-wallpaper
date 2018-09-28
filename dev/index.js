/*
 * @file dev of wonderful-bing-wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

const WonderfulBingWallpaper = require('../src/bing')
const xml2js = require('xml2js')

const resolutions = WonderfulBingWallpaper.resolutions
const wallPaper = new WonderfulBingWallpaper({
  /*
  n: 1,
  idx: 0,
  format: 'js',
  resolution: resolutions[0]
  */
  host: 'cn.bing.com',
  mkt: 'zh-cn'
})

console.log('wallPaper', wallPaper)
console.log('\nwallPaper resolutions', resolutions)

// default json
wallPaper.get().then(wallpaperJSON => {
  console.group('wallpaperJSON-1')
  console.log('got wallpaperJSON-1 data', wallpaperJSON)
  console.log('got wallpaperJSON-1 humanize data', wallPaper.humanize(wallpaperJSON))
  console.log('got wallpaperJSON-1[0] humanize data\n', wallPaper.humanize(wallpaperJSON[0]))
  console.groupEnd()
})

// params json
wallPaper.get({ n: 10, idx: 2 }).then(wallpaperJSON => {
  console.group('wallpaperJSON-2')
  console.log('got wallpaperJSON-2 data', wallpaperJSON)
  console.log('got wallpaperJSON-2 humanize data', wallPaper.humanize(wallpaperJSON))
  console.log('got wallpaperJSON-2[0] humanize data\n', wallPaper.humanize(wallpaperJSON[0]))
  console.groupEnd()
})

/*
// xml
wallPaper.get({ format: 'xml' }).then(wallpaperXML => {
  console.group('wallpaperXML')
  console.debug('got wallpaperXML data\n', wallpaperXML)
  xml2js.parseString(wallpaperXML, (err, result) => {
    console.log('wallpaperXML', result)
  })
  console.groupEnd()
})

// rss
wallPaper.get({ format: 'rss' }).then(wallpaperRSS => {
  console.group('wallpaperRSS')
  console.debug('got wallpaperRSS data\n', wallpaperRSS)
  xml2js.parseString(wallpaperRSS, (err, result) => {
    console.log('wallpaperRSS', result)
  })
  console.groupEnd()
})
*/
