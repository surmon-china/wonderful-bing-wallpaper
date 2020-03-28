/**
 * @file Test of WonderfulBingWallpaper Class
 * @author Surmon <https://github.com/surmon-china>
 */

import WonderfulBingWallpaper from '../src/bing'
import xml2js from 'xml2js'

const resolutions = WonderfulBingWallpaper.getResolutions()
const wbw = new WonderfulBingWallpaper({
  size: 8,
  day: 7,
  resolution: resolutions[2],
  host: 'cn.bing.com',
  local: 'zh-cn'
})

describe('Test Class WonderfulBingWallpaper', () => {

  it('test instance', () => {
    expect(wbw).toBeInstanceOf(WonderfulBingWallpaper)
    expect(wbw.options.host).toBe('cn.bing.com')
    expect(wbw.options.local).toBe('zh-cn')
    expect(wbw.options.day).toBe(7)
  })

  it('test resolutions', () => {
    expect(resolutions.length).toBe(14)
    expect(resolutions[6]).toBe('800x480')
  })

  it('test getWallpapers', done => {
    wbw.getWallpapers()
      .then((data: any) => {
        expect(data.length).toBe(8)
        expect(data[0].url.indexOf('.jpg') > -1).toBe(true)
        done()
      })
      .catch((error: any) => {
        done(error)
      })
  })

  it('test params getWallpapers', done => {
    wbw.getWallpapers({ size: 10, day: 2 })
      .then((data: any) => {
        expect(data.length).toBe(8)
        expect(data[0].url.indexOf('.jpg') > -1).toBe(true)
        expect(data[0].quiz.indexOf('/search')).toBe(0)
        done()
      })
      .catch((error: any) => {
        done(error)
      })
  })

  it('test getWallpapers format', done => {
    wbw.getWallpapers({ format: 'xml' })
      .then((wallpaperXML: any) => {
        xml2js.parseString(wallpaperXML, (_, wallpaperXMLJSON) => {
          expect(wallpaperXML).not.toBeUndefined()
          expect(wallpaperXMLJSON).not.toBeUndefined()
          expect(Object.keys(wallpaperXMLJSON.images).includes('tooltips')).toBe(true)
          expect(wallpaperXMLJSON.images.image.length).toBe(8)
          expect(wallpaperXMLJSON.images.image[0].copyright[0]).not.toBeUndefined()
          done()
        })
      })
      .catch((error: any) => {
        done(error)
      })
  })

  it('test setOptions', () => {
    wbw.setOptions({ size: 3 })
    expect(wbw.options.size).toBe(3)
  })

  it('test rss format and options merge', done => {
    wbw.getWallpapers({ format: 'rss' })
      .then((data: any) => {
        xml2js.parseString(data, (_, wallpaperXMLJSON) => {
          expect(wallpaperXMLJSON.rss.channel.length).toBe(1)
          expect(wallpaperXMLJSON.rss.channel[0].link[0]).toBe('http://bing.com/HPImageArchive.aspx?format=rss')
          expect(wallpaperXMLJSON.rss.channel[0].item.length).toBe(3)
          done()
        })
      })
      .catch((error: any) => {
        done(error)
      })
  })
})
