/*
 * @file Example of wonderful-bing-wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

const xml2js = require('xml2js')
const WonderfulBingWallpaper = require('../dist/bing.cjs')

const resolutions = WonderfulBingWallpaper.getResolutions()
const wbw = new WonderfulBingWallpaper({
  size: 8,
  day: 7,
  resolution: resolutions[2],
  host: 'cn.bing.com',
  local: 'zh-cn',
})

console.log('wallPaper', wbw)
console.log('\nwallPaper resolutions', resolutions, resolutions[3])

// default json
wbw.getWallpapers().then(wallpaperJSON => {
  console.group('wallpaperJSON-1')
  console.log('got wallpaperJSON-1 data', wallpaperJSON)
  console.log(`\ngot wallpaperJSON-1 humanizeWallpapers data :url = ${resolutions[2]}\n`, wbw.humanizeWallpapers(wallpaperJSON))
  console.log(`\ngot wallpaperJSON-1 humanizeWallpapers data :url = ${resolutions[3]}\n`, wbw.humanizeWallpapers(wallpaperJSON, resolutions[3]))
  console.log(`\ngot wallpaperJSON-1[0] humanizeWallpapers data :url = ${resolutions[2]}\n`, wbw.humanizeWallpapers(wallpaperJSON[0]))
  console.log(`\ngot wallpaperJSON-1[0] humanizeWallpapers data :url = ${resolutions[5]}\n`, wbw.humanizeWallpapers(wallpaperJSON[0], resolutions[5]))
  console.groupEnd()
})

// params json
wbw.getWallpapers({ size: 10, day: 2 }).then(wallpaperJSON => {
  console.group('wallpaperJSON-2')
  console.log('got wallpaperJSON-2 data', wallpaperJSON)
  console.log('got wallpaperJSON-2 humanizeWallpapers data', wbw.humanizeWallpapers(wallpaperJSON))
  console.log('got wallpaperJSON-2[0] humanizeWallpapers data\n', wbw.humanizeWallpapers(wallpaperJSON[0]))
  console.groupEnd()
})

wbw.setOptions({ ensearch: 1 })

// ensearch
wbw.getWallpapers().then(wallpaperJSON => {
  console.group('wallpaperJSON-3')
  console.log('got wallpaperJSON-3 data', wallpaperJSON)
  console.log('got wallpaperJSON-3 humanizeWallpapers data', wbw.humanizeWallpapers(wallpaperJSON))
  console.groupEnd()
})

// xml
wbw.getWallpapers({ format: 'xml' }).then(wallpaperXML => {
  console.group('wallpaperXML')
  console.debug('got wallpaperXML data\n', wallpaperXML)
  xml2js.parseString(wallpaperXML, (err, result) => {
    console.log('wallpaperXML', result)
  })
  console.groupEnd()
})

// setOptions
wbw.setOptions({ size: 3 })

// rss
wbw.getWallpapers({ format: 'rss' }).then(wallpaperRSS => {
  console.group('wallpaperRSS')
  console.debug('got wallpaperRSS data\n', wallpaperRSS)
  xml2js.parseString(wallpaperRSS, (err, result) => {
    console.log('wallpaperRSS', result)
  })
  console.groupEnd()
})
