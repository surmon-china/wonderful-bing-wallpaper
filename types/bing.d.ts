/**
 * @file WonderfulBingWallpaper Class
 * @author Surmon <https://github.com/surmon-china>
 */
/**
 * Default options.
 * @return {Object} A default options.
 */
declare const DEFAULT_OPTIONS: Readonly<{
    size: number;
    day: number;
    format: string;
    ensearch: number;
    local: string;
    host: string;
    wallpaperApi: string;
    resolution: string;
}>;
declare type WonderfulBingWallpaperOption = Partial<typeof DEFAULT_OPTIONS>;
export default class WonderfulBingWallpaper {
    options: WonderfulBingWallpaperOption;
    constructor(options?: WonderfulBingWallpaperOption);
    /**
     * Set the instance new options.
     * @param {options} The WonderfulBingWallpaper options.
     */
    setOptions(options: WonderfulBingWallpaperOption): void;
    /**
     * Get the wallpapers by params.
     * @param {params} size - wallpapers size.
     * @param {params} day - Before days.
     * @param {params} local - The location.
     * @param {params} format - The result doc format.
     */
    getWallpapers(params?: WonderfulBingWallpaperOption): any;
    /**
     * Get the humanize wallpapers by original wallpapers.
     * @param {object} wallpaperJson - original wallpapers.
     * @param {string} resolution - wallpaper resolution.
     */
    humanizeWallpapers(wallpaperJson: any | any[], resolution?: string): any;
    /**
     * Static function.
     * @return {Array} A resolutions array.
     */
    static getResolutions(): string[];
}
export {};
