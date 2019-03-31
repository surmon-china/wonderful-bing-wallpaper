/*
 * @file Mocha test of wonderful-bing-wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

const WonderfulBingWallpaper = require('../dist/bing')
const xml2js = require('xml2js')
const expect = require('chai').expect

const resolutions = WonderfulBingWallpaper.resolutions
const wbw = new WonderfulBingWallpaper({
  size: 8,
  day: 7,
  resolution: resolutions[2],  
  host: 'cn.bing.com',
  local: 'zh-cn'
})

describe('Test Class WonderfulBingWallpaper', () => {
  
  it('test instance', () => {
    expect(wbw instanceof WonderfulBingWallpaper).to.equal(true)
    expect(wbw.options.host).to.equal('cn.bing.com')
    expect(wbw.options.local).to.equal('zh-cn')
    expect(wbw.options.day).to.equal(7)
  })

  it('test resolutions', () => {
    expect(resolutions.length).to.equal(14)
    expect(resolutions[6]).to.equal('800x480')
  })

  it('test getWallpapers', done => {
    wbw.getWallpapers()
      .then(data => {
        expect(data.length).to.equal(8)
        expect(data[0].url.indexOf('.jpg') > -1).to.be.equal(true)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('test params getWallpapers', done => {
    wbw.getWallpapers({ size: 10, day: 2 })
      .then(data => {
        expect(data.length).to.equal(8)
        expect(data[0].url.indexOf('.jpg') > -1).to.be.equal(true)
        expect(data[0].quiz.indexOf('/search') === 0).to.be.equal(true)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('test getWallpapers format', done => {
    wbw.getWallpapers({ format: 'xml' })
      .then(wallpaperXML => {
        xml2js.parseString(wallpaperXML, (err, wallpaperXMLJSON) => {
          expect(wallpaperXML).not.to.be.empty
          expect(wallpaperXMLJSON).not.to.be.empty
          expect(Object.keys(wallpaperXMLJSON.images).includes('tooltips')).to.be.equal(true)
          expect(wallpaperXMLJSON.images.image.length === 8).to.be.equal(true)
          expect(wallpaperXMLJSON.images.image[0].copyright[0]).not.to.be.empty
          done()
        })
      })
      .catch(err => {
        done(err)
      })
  })

  it('test setOptions', () => {
    wbw.setOptions({ size: 3 })
    expect(wbw.options.size).to.equal(3)
  })

  it('test rss format and options merge', done => {
    wbw.getWallpapers({ format: 'rss' })
      .then(data => {
        xml2js.parseString(data, (err, wallpaperXMLJSON) => {
          expect(wallpaperXMLJSON.rss.channel.length).to.equal(1)
          expect(wallpaperXMLJSON.rss.channel[0].link[0] === 'http://bing.com/HPImageArchive.aspx?format=rss').to.equal(true)
          expect(wallpaperXMLJSON.rss.channel[0].item.length).to.equal(3)
          done()
        })
      })
      .catch(e => {
        done(e)
      })
  })
})
