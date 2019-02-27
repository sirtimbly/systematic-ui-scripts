
import {fractal} from "./configs/fractal";
import {ncp} from "ncp";
const ds = {
  "Fractal(1)": fractal,
  "UI Engine": {}
}

import inquirer from "inquirer";
import { addDeps } from "./add-deps";

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

    addDeps(dsConfig.scripts, dsConfig.dependencies, dsConfig.devDependencies);
    console.log("Finished.")
  } else {
    console.error("Cant load config");
  }
})
