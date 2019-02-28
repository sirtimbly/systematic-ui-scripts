import { mkdirSync } from "fs";
import mkdirp from "mkdirp";

export const scss = {
  scripts: {
    "scss:start": "parcel watch src/styles/main.scss",
    "scss:build": "parcel watch --no-content-hash src/styles/main.scss ",
  },
  dependencies: {
    "@frctl/fractal": "^1.1.7",
    "@frctl/handlebars": "^1.1.5",
  },
  cpFolderStructure: ["templates/fractal1/"],
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

    if (answers.organization === "atomic") {
      mkdirp(process.cwd() + "/src/components/atoms", cb);
      mkdirp(process.cwd() + "/src/components/molecules", cb);
      mkdirp(process.cwd() + "/src/components/organisms", cb);
      mkdirp(process.cwd() + "/src/components/templates", cb);
    }
    if (answers.organization === "oocss") {
      mkdirp(process.cwd() + "/src/components/01-objects", cb);
      mkdirp(process.cwd() + "/src/components/01-components", cb);
      mkdirp(process.cwd() + "/src/components/prototypes", cb);
    }
  }
}
