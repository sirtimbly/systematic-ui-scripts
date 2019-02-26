"use strict";
import * as gulp from "gulp";
var fractal = require("@frctl/fractal").create();


const hbs = require("@frctl/handlebars")({
  helpers: {
    handleize: function(str) {
      return "@" + str;
    },
    ifCond: function(v1, operator, v2, options) {

      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
    singleQuotes: function(str) {
      if (!str) {
        str = "/";
      }
      return `${str}`;
    }
  }
});

fractal.set("project.title", "HortusBI"); // title for the project
fractal.web.set("server.syncOptions", {
  open: true,
  files: ["/styleguide-static/css/app.css"]
});
fractal.web.set("builder.dest", "styleguide"); // destination for the static export
fractal.web.set("static.path",  "styleguide-static");
fractal.docs.set("path", `src/docs`); // location of the documentation directory.
fractal.components.set("path", `src/components`); // location of the component directory.
fractal.components.engine(hbs);
// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task("fractal:start", function() {
  const server = fractal.web.server({
    sync: true
  });
  server.on("error", err => logger.error(err.message));
  server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task("fractal:build", function() {
  fractal.web.set('builder.concurrency', 20)
  const builder = fractal.web.builder();
  builder.on("progress", (completed, total) =>
    logger.update(`Exported ${completed} of ${total} items`, "info")
  );
  builder.on("error", err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success("Fractal build completed!");
  });
});
