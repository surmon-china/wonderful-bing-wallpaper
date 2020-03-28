# wonderful-bing-wallpaper

[![GitHub stars](https://img.shields.io/github/stars/surmon-china/wonderful-bing-wallpaper.svg?style=for-the-badge)](https://github.com/surmon-china/wonderful-bing-wallpaper/stargazers)
[![npm](https://img.shields.io/npm/v/wonderful-bing-wallpaper?color=%23c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/wonderful-bing-wallpaper)
[![GitHub issues](https://img.shields.io/github/issues-raw/surmon-china/wonderful-bing-wallpaper.svg?style=for-the-badge)](https://github.com/surmon-china/wonderful-bing-wallpaper/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/surmon-china/wonderful-bing-wallpaper.svg?style=for-the-badge)](https://github.com/surmon-china/wonderful-bing-wallpaper)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=for-the-badge)](https://github.com/surmon-china/wonderful-bing-wallpaper/blob/master/LICENSE)


[![NPM](https://nodei.co/npm/wonderful-bing-wallpaper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/wonderful-bing-wallpaper/)


🌅A simple bing daily wallpaper api lib. 极简的 Node.js 版必应壁纸 API 库。

- 简单：**1 个接口**
- 稳定：**与 Bing 同在**
- 轻巧：**不依赖任何第三方**

### 参考

[stackoverflow - Is there a way to get Bing's photo of the day?](https://stackoverflow.com/a/18096210/6222535) 

### 实例

- [Example code](https://github.com/surmon-china/wonderful-bing-wallpaper/blob/master/dev/index.js)
- [Online site example - 山河入梦](https://surmon.me)

### 怎么用

```bash
npm i wonderful-bing-wallpaper --save
```

```javascript
const WonderfulBingWallpaper = require('wonderful-bing-wallpaper')

// get support resolutions list
const resolutions = WonderfulBingWallpaper.getResolutions()

// instance
const wbw = new WonderfulBingWallpaper({ /* options */ })

// update default options
wbw.setOptions({ /* options */ })

// get daily wallpapers
wbw.getWallpapers({ /* params */ }).then(wallpaperJSON => {
  console.log('got wallpaperJSON data', wallpaperJSON)
  console.log('got humanizeWallpapers data - Array', wbw.humanizeWallpapers(wallpaperJSON))
  console.log('got humanizeWallpapers data - Object', wbw.humanizeWallpapers(wallpaperJSON[0]))
})
```

### API

#### `new WonderfulBingWallpaper(options?: object): instance` 
#### `wbw.setOptions(options?: object)`

@return `WonderfulBingWallpaper` instance

**recommended option field（推荐设置的字段）**

|params|type|required|default|desc|
|:----:|:--:|:------:|:-----:|----|
|size  |`Number`|false|`1`| how many images - 几张图片 `size <= 8`|
|day   |`Number`|false|`0`| how days before - 往前推几天 `day <= 7`|
|format|`String`|false|`js`| result data format - 返回数据的格式 `js`/`xml`/`rss` |
|local |`String`|false|`en-US`| your location - 你想拿到什么语言的版本（国内 `zh-CN`）|

**not recommended option field（非必要情况不要设置的字段）**

|params|type|required|default|desc|
|:----:|:--:|:------:|:-----:|----|
|ensearch|`number`|false|0| `0 / 1` <br> 1 则查询全量数据，包括如图片描述、故事、封面文字...开启后会被强制切换为全英文（实际 bing 拿的美版数据）|
|host  |`String`|false|`www.bing.com`| bing wallpaper api host <br> 你想在哪个服务器拿数据（国内 `cn.bing.com`）|
|wallpaperApi|`String`|false|`/HPImageArchive.aspx`| bing wallpaper api path <br> 如果哪天 Bing 改接口了你可以手动设置一下|
|resolution|`String`|false|`1920x1200`| `humanizeWallpapers` second param default resolution <br> 使用 `humanizeWallpapers` 方法时第二参数的默认值|

---

#### `wbw.getWallpapers(params?: object): array`

@return wallpaper array

the same as option fields.

---

#### `wbw.humanizeWallpapers(wallPapers: object | array, resolution?: string): object | array`

@return humanized wallpaper data.

```ts
{
  ...wallpaper,
  humanizedSearchUrl: string,
  humanizedImageUrl: string,
  humanizeResolutionUrl: string
}
```

|params|type|required|default|desc|
|:----:|:--:|:------:|:-----:|----|
|wallPapers|`Array/Object`|true|`null`| wallpaper images <br> 图片或多张图片|
|resolution|`String`|false|`{instance}.options.resolution`| wallpaper resolution <br> 要输出的图片地址里的分辨率|

---

### 测试执行

```
yarn
yarn dev
yarn lint
yarn test
yarn build
npm run test
```

### License

[MIT](https://github.com/surmon-china/wonderful-bing-wallpaper/blob/master/LICENSE)
