
import { src, dest, series} from "gulp";
import cssnano from "gulp-cssnano";
import rename from "gulp-rename";
import fontmin from "gulp-fontmin";


// switching to CDN and JS-SVG solution
const iconFonts = [
  "src/styles/vendor/webfonts/element-icons*",
  // "src/styles/vendor/webfonts/fa-regular*",
  // "src/styles/vendor/webfonts/fa-solid*",
];

const textFonts = [
  "src/styles/vendor/webfonts/Inter-Regular*.ttf",
  "src/styles/vendor/webfonts/Inter-Bold*.ttf",
];

export function minifyFonts() {

  return  src(textFonts)
      .pipe(fontmin({
          text: "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnméóáñ!@#$%^&*()',.<>?[];:|+=-_",
          // hinting: false // keep ttf hint info (fpgm, prep, cvt). default = true
      }))
      .pipe(dest("public/webfonts"));
    // src("public/webfonts/*.ttf")
    //   .pipe(ttf2woff2)
    //   .pipe(dest("public/webfonts"))

}

export function copyStyles() {
  return src("src/styles/*.css").pipe(dest("styleguide-static/css"));
}

// task("copy:maps", function() {
//   return src("src/maps/**/*")
//     .pipe(dest("styleguide-static/maps"))
// });

export function copyMapsToPublic() {
  return src(["styleguide-static/css/**/*.map", "!documentation*"])
    .pipe(dest("public/css"));
}

export function copyAssets() {
  return src("src/assets/**/*").pipe(dest("styleguide-static/images"));
}

export function copyFonts() {
  return src(textFonts).pipe(dest("styleguide-static/webfonts"));
}

export function copyStylesToPublic() {
  return src(["src/styles/*.css", "!documentation*.css"])
    .pipe(dest("public/css"));
}

export function minifyToPublic() {
  return src("src/styles/*.css")
    // .pipe(sourcemaps.init())
    .pipe(cssnano())
    // .pipe(sourcemaps.write("."))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(dest("public/css"));
}

export function copyFontsToPublic() {
  return src(iconFonts)
    .pipe(dest("public/webfonts"));
}

export function copyAssetsToPublic() {
  return src("src/assets/*").pipe(dest("public/images"));
}

export function copyStyleGuideWebConfig() {
  return src("public/styleguide_web.config")
    .pipe(rename("web.config"))
    .pipe(dest("styleguide"));
}

