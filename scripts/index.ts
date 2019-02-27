import { minifyFonts, copyAssets, copyAssetsToPublic, copyMapsToPublic, copyFonts, copyFontsToPublic, copyStyles, copyStylesToPublic } from "./gulp-tasks/copy";
import { compileScss, lint } from "./gulp-tasks/scss";
import { fontSizeReport, sizeReport } from "./gulp-tasks/reports";
export {
  minifyFonts,
  copyAssets,
  copyAssetsToPublic,
  copyMapsToPublic,
  copyFonts,
  copyFontsToPublic,
  copyStyles,
  copyStylesToPublic ,
  compileScss,
  lint,
  fontSizeReport,
  sizeReport
}
