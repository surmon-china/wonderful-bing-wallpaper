import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'WonderfulBingWallpaper',
  entry: 'src/bing.ts',
  outDir: 'dist',
  outFileName: 'bing',
  targets: ['esm', 'cjs'],
  sourcemap: false,
})
