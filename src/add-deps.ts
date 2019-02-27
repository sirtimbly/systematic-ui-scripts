import fs from "fs";
type deps = { [key: string]: "string" };
export function addDeps(scripts: deps, dependencies: deps, devDependencies: deps) {
  const file = process.cwd()+"/package.json";
  if (!file) {
    console.error("Couldn't load package.json in " + process.cwd());
    return;
  }

  const original = JSON.parse(fs.readFileSync(file, { encoding: 'UTF8'}));

  if (!original) {
    console.error("Couldn't parse package.json");
    return;
  }

  if (!original.dependencies) {
    original.dependencies = {}
  }

  if (!original.devDependencies) {
    original.devDependencies = {}
  }
  if (!original.scripts) {
    original.scripts = {}
  }

  original.devDependencies = Object.assign(original.devDependencies, devDependencies);
  original.dependencies = Object.assign(original.dependencies, dependencies);
  original.scripts = Object.assign(original.scripts, scripts);

  console.log("writing updated package.json")

  fs.writeFileSync(file, JSON.stringify(original, null, 2));
}
