

import { src} from "gulp";
import sizereport from "gulp-sizereport";

const ratioFontSize = 47600;
const fontBudget = 100000 - ratioFontSize;
const cssBudget = 40000;

export function sizeReport() {
  return src("public/css/*min.css")
    .pipe(sizereport({
      gzip: true,
      total: true,
      fail: true,
      maxTotalGzippedSize: cssBudget
    }));
}

export function fontSizeReport() {
  return src("public/webfonts/*.woff")
    .pipe(sizereport({
      gzip: true,
      total: true,
      fail: true,
      maxTotalGzippedSize: fontBudget
    }));
}

