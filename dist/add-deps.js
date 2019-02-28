"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
function addDeps(scripts, dependencies, devDependencies) {
    var file = process.cwd() + "/package.json";
    if (!file) {
        console.error("Couldn't load package.json in " + process.cwd());
        return;
    }
    var original = JSON.parse(fs_1.default.readFileSync(file, { encoding: 'UTF8' }));
    if (!original) {
        console.error("Couldn't parse package.json");
        return;
    }
    if (!original.dependencies) {
        original.dependencies = {};
    }
    if (!original.devDependencies) {
        original.devDependencies = {};
    }
    if (!original.scripts) {
        original.scripts = {};
    }
    original.devDependencies = Object.assign(original.devDependencies, devDependencies);
    original.dependencies = Object.assign(original.dependencies, dependencies);
    original.scripts = Object.assign(original.scripts, scripts);
    console.log("writing updated package.json");
    fs_1.default.writeFileSync(file, JSON.stringify(original, null, 2));
}
exports.addDeps = addDeps;
//# sourceMappingURL=add-deps.js.map