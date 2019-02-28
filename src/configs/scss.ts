import { mkdirSync } from "fs";
import mkdirp from "mkdirp";
import { addDeps } from "../add-deps";

export const scss = {
  scripts: {
    "scss:start": "parcel watch src/styles/main.scss",
    "scss:build": "parcel watch --no-content-hash src/styles/main.scss ",
  },
  dependencies: {
    // "@frctl/fractal": "^1.1.7",
    // "@frctl/handlebars": "^1.1.5",
  },

  cpFolderStructure: ["templates/scss"],

  prompts: [{
    type: "list",
    name: "architecture",
    choices: [
      {value: "itcss", name: "IT-CSS Inverted Triangle (inuitcss)"},
      {value: "foundation", name: "Foundation for Sites by Zurb"},
    ],
  }],

  handler: (answers) => {
    function cb(err, made) {
      console.log(err);
      console.log(made);
    }

    if (answers.organization === "itcss") {
      const add = {
        "dependencies": {
          "inuitcss": "^6.0.0",
        }
      }
      addDeps(add);
      mkdirp(process.cwd() + "/src/styles/atoms", cb);
    }
    if (answers.organization === "oocss") {
      mkdirp(process.cwd() + "/src/components/01-objects", cb);
      mkdirp(process.cwd() + "/src/components/01-components", cb);
      mkdirp(process.cwd() + "/src/components/prototypes", cb);
    }
  }
}
