import fs from "fs";
type deps = { [key: string]: string };
type projectDef = {
  dependencies?: deps,
  devDependencies?: deps,
  scripts?: deps,
  [key: string]: deps
};
export function addDeps(additions: projectDef) {
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

  for (const key in additions) {
    if (!original[key]) {
      original[key] = {}
    }
    original[key] = Object.assign(original[key], additions[key]);
  }

  console.log("=== Writing updated package.json ===", original)

  fs.writeFileSync(file, JSON.stringify(original, null, 2));
}
