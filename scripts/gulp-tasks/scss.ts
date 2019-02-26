
import { src, dest, series, parallel} from "gulp";
import postcss from "gulp-postcss";
import autoprefixer from "gulp-autoprefixer";
import cached from "gulp-cached";
import progeny from "gulp-progeny";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import reporter from "postcss-reporter";
import syntax_scss from "postcss-scss";
import stylelint from "stylelint";
import {Options} from "node-sass";
import tildeImporter from "node-sass-tilde-importer";

const processors = [
  stylelint,
  reporter({
    clearMessages: true,
    throwError: true // makes the build fail if any warning
  })
];

export function lint() {
  return src("src/**/*.scss")
    .pipe(postcss(processors, {
      syntax: syntax_scss
    }));
}

export function compileScss() {
  return src("src/**/*.scss")
    .pipe(postcss(processors, {
      syntax: syntax_scss
    }))
    .pipe(cached("sass"))
    .pipe(progeny())
    .pipe(sourcemaps.init())
    .pipe(sass({
        importer: tildeImporter
      } as Options).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(
      sourcemaps.write("../styleguide-static/css/", {
        sourceMappingURL(file) {
          return "./" + file.relative.replace(/\\/g, "/") + ".map";
        }
      })
    )
    .pipe(
      dest(function(file) {
        return file.base;
      })
    );
}
