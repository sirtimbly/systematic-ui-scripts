export const fractal = {
  scripts: {
    "ds:start": "fractal start --sync",
    "ds:build": "fractal build",
  },
  dependencies: {
    "@frctl/fractal": "^1.1.7",
    "@frctl/handlebars": "^1.1.5",
  },
  cpFolderStructure: ["templates/fractal1/"],
  prompts: [{
    type: "list",
    name: "organization",
    choices: [
      {value: "atomic", name: "Atomic (atoms, molecules, organisms, templates)"},
      {value: "OOCSS", name: "OOCSS (objects, components, prototypes)"},
    ],
  }],
  handler: () => {

  }
}
