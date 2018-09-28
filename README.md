[![GitHub stars](https://img.shields.io/github/stars/surmon-china/wonderful-bing-wallpaper.svg?style=flat-square)](https://github.com/surmon-china/wonderful-bing-wallpaper/stargazers)
[![Build Status](https://travis-ci.org/surmon-china/wonderful-bing-wallpaper.svg?branch=master)](https://travis-ci.org/surmon-china/wonderful-bing-wallpaper)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/wonderful-bing-wallpaper.svg?style=flat-square)](https://github.com/surmon-china/wonderful-bing-wallpaper/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/wonderful-bing-wallpaper.svg?style=flat-square)](https://github.com/surmon-china/wonderful-bing-wallpaper/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/surmon-china/wonderful-bing-wallpaper)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/surmon-china/wonderful-bing-wallpaper)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/wonderful-bing-wallpaper.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/wonderful-bing-wallpaper)
[![](https://badge.juejin.im/entry/5946b695128fe1006a48643f/likes.svg?style=flat-square)](https://juejin.im/entry/5946b695128fe1006a48643f/detail)

[![NPM](https://nodei.co/npm/wonderful-bing-wallpaper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/wonderful-bing-wallpaper/)
[![NPM](https://nodei.co/npm-dl/wonderful-bing-wallpaper.png?months=9&height=3)](https://nodei.co/npm/wonderful-bing-wallpaper/)

### wonderful-bing-wallpaper

🌅A simple bing daily wallpaper api lib. 极简的 Node.js 版必应壁纸 API 库。

- 简单：1 个接口
- 稳定：与 Bing 同在
- 轻巧：不依赖任何第三方

### 贡献者

[stackoverflow - Is there a way to get Bing's photo of the day?](https://stackoverflow.com/a/18096210/6222535) 

### 实例

[example.js](https://github.com/surmon-china/wonderful-bing-wallpaper/blob/master/examples/index.js)

[onLine site - example](https://surmon.me)

### 怎么用

```bash
npm i wonderful-bing-wallpaper --save
```

```javascript
// require
const WonderfulBingWallpaper = require('wonderful-bing-wallpaper')

// get support resolutions list
const resolutions = WonderfulBingWallpaper.resolutions

// instance
const wbw = new WonderfulBingWallpaper(options)

// update default options
wbw.setOptions(options)

// get daily wallpapers
wbw.getWallpapers(params).then(wallpaperJSON => {
  console.log('got wallpaperJSON data', wallpaperJSON)
  console.log('got humanizeWallpapers data - Array', wbw.humanizeWallpapers(wallpaperJSON))
  console.log('got humanizeWallpapers data - Object', wbw.humanizeWallpapers(wallpaperJSON[0]))
})

// get today wallpaper story
wbw.getTodayWallpaperStory(todayWallpaperStory => {
    console.log('todayWallpaperStory', todayWallpaperStory)
})
```

### API

#### `new WonderfulBingWallpaper(options?: object): instance` 
#### `wbw.setOptions(options?: object): instance`

@return `WonderfulBingWallpaper` instance

**recommended option field（推荐设置的字段）**

|params|type|required|default|desc|
|:----:|:--:|:------:|:-----:|----|
|size  |`Number`|false|`1`| how many images - 几张图片 `size <= 8`|
|day   |`Number`|false|`0`| how days before - 往前推几天 `day <= 7`|
|format|`String`|false|`js`| result data format - 返回数据的格式 `js`/`xml`/`ssr` |
|local |`String`|false|`en-US`| your location - 你想拿到什么语言的版本（国内 `zh-CN`）|

**not recommended option field（非必要情况不要设置的字段）**

|params|type|required|default|desc|
|:----:|:--:|:------:|:-----:|----|
|host  |`String`|false|`www.bing.com`| bing wallpaper api host <br> 你想在哪个服务器拿数据（国内 `cn.bing.com`）|
|wallpaperApi|`String`|false|`/HPImageArchive.aspx`| bing wallpaper api path <br> 如果哪天 Bing 改接口了你可以手动设置一下|
|storyApi|`String`|false|`/cnhp/coverstory/`| bing wallpaper story api path <br>  今日壁纸故事 API，只能获取今天|
|resolution|`String`|false|`1920x1200`| `humanizeWallpapers` second param default resolution <br> 使用 `humanizeWallpapers` 方法时第二参数的默认值|

---

#### `wbw.getWallpapers(params?: object): array`

@return wallpaper array

the same as [Options - recommended option field](#wbwsetoptionsoptions-object-instance)

---

#### `wbw.humanizeWallpapers(wallPapers: object | array, resolution?: string): array`

@return humanize wallpaper array

|params|type|required|default|desc|
|:----:|:--:|:------:|:-----:|----|
|wallPapers|`Array/Object`|true|`null`| wallpaper images <br> 图片或多张图片|
|resolution|`String`|false|`{instance}.options.resolution`| wallpaper resolution <br> 要输出的图片地址里的分辨率|

---

#### `wbw.getTodayWallpaperStory(): object`

@return wallpaper story object

---

### 测试执行

```
npm i
npm run dev
npm run test
```


### Author

[Surmon](https://surmon.me)

