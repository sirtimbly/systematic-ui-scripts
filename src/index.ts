#! /usr/bin/env node

import inquirer from "inquirer";
import commander from "commander";
import {ncp} from "ncp";

import { addDeps } from "./add-deps";
import {fractal} from "./configs/fractal";
import { scss } from "./configs/scss";

const ds = {
  "Fractal(1)": fractal,
  "UI Engine": {}
}

const preprocessors = {
  "SCSS": scss,
  "PostCSS": {}
}



const program = commander;

program
  .version('0.1.0')
  .command('ds')
  .description('Initialize a design system UI')
  .action(() => {
    console.log("Design System UI Initialization")
    newDesignSystem();
  })
  .command('styles')
  .description('Initialize a CSS Build Architecture')
  .action(() => {
    console.log("CSS styles Initialization")
    newStylesSystem();
  })



function newDesignSystem() {
  inquirer.prompt([
    {
      name: "ds",
      message: "Which Design System Library",
      type: "list",
      choices: Object.keys(ds),
    }
  ]).then((answers: any) => {
    console.log("answers", answers);
    const dsConfig = ds[answers.ds];
    if (dsConfig) {
      dsConfig.cpFolderStructure.map(p => {
        ncp(__dirname + "/../" + p, process.cwd(), (err) => {
          console.error(err);
        });
      })

      addDeps({
        "scripts": dsConfig.scripts,
        "dependencies": dsConfig.dependencies,
        "devDependencies": dsConfig.devDependencies
      });

      inquirer.prompt(dsConfig.prompts).then(dsConfig.handler);

      console.log("Finished.")
    } else {
      console.error("Cant load config");
    }
  })
}

function newStylesSystem() {
  inquirer.prompt([
    {
      name: "styles",
      message: "Which Preprocessor",
      type: "list",
      choices: Object.keys(ds),
    }
  ]).then((answers: any) => {
    console.log("answers", answers);
    const dsConfig = ds[answers.ds];
    if (dsConfig) {
      dsConfig.cpFolderStructure.map(p => {
        ncp(__dirname + "/../" + p, process.cwd(), (err) => {
          console.error(err);
        });
      })

      addDeps({
        "scripts": dsConfig.scripts,
        "dependencies": dsConfig.dependencies,
        "devDependencies": dsConfig.devDependencies
      });

      inquirer.prompt(dsConfig.prompts).then(dsConfig.handler);

      console.log("Finished.")
    } else {
      console.error("Cant load config");
    }
  })
}
