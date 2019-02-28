"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mkdirp_1 = tslib_1.__importDefault(require("mkdirp"));
exports.fractal = {
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
                { value: "atomic", name: "Atomic (atoms, molecules, organisms, templates)" },
                { value: "oocss", name: "OOCSS (objects, components, prototypes)" },
            ],
        }],
    handler: function (answers) {
        function cb(err, made) {
            console.log(err);
            console.log(made);
        }
        if (answers.organization === "atomic") {
            mkdirp_1.default(process.cwd() + "/src/components/atoms", cb);
            mkdirp_1.default(process.cwd() + "/src/components/molecules", cb);
            mkdirp_1.default(process.cwd() + "/src/components/organisms", cb);
            mkdirp_1.default(process.cwd() + "/src/components/templates", cb);
        }
        if (answers.organization === "oocss") {
            mkdirp_1.default(process.cwd() + "/src/components/01-objects", cb);
            mkdirp_1.default(process.cwd() + "/src/components/01-components", cb);
            mkdirp_1.default(process.cwd() + "/src/components/prototypes", cb);
        }
    }
};
//# sourceMappingURL=fractal.js.map