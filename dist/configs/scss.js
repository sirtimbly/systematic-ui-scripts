"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mkdirp_1 = tslib_1.__importDefault(require("mkdirp"));
exports.scss = {
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
                { value: "itcss", name: "IT-CSS Inverted Triangle (inuitcss)" },
                { value: "foundation", name: "Foundation for Sites by Zurb" },
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
//# sourceMappingURL=scss.js.map