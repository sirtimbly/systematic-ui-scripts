"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
function addDeps(additions) {
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
    for (var key in additions) {
        if (!original[key]) {
            original[key] = {};
        }
        original[key] = Object.assign(original[key], additions[key]);
    }
    console.log("=== Writing updated package.json ===", original);
    fs_1.default.writeFileSync(file, JSON.stringify(original, null, 2));
}
exports.addDeps = addDeps;
//# sourceMappingURL=add-deps.js.map