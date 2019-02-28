#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer_1 = tslib_1.__importDefault(require("inquirer"));
var commander_1 = tslib_1.__importDefault(require("commander"));
var ncp_1 = require("ncp");
var add_deps_1 = require("./add-deps");
var fractal_1 = require("./configs/fractal");
var scss_1 = require("./configs/scss");
var ds = {
    "Fractal(1)": fractal_1.fractal,
    "UI Engine": {}
};
var preprocessors = {
    "SCSS": scss_1.scss,
    "PostCSS": {}
};
var program = commander_1.default;
program
    .version('0.1.0')
    .command('ds')
    .description('Initialize a design system UI')
    .action(function () {
    console.log("Design System UI Initialization");
    newDesignSystem();
})
    .command('styles')
    .description('Initialize a CSS Build Architecture')
    .action(function () {
    console.log("CSS styles Initialization");
    newStylesSystem();
});
function newDesignSystem() {
    inquirer_1.default.prompt([
        {
            name: "ds",
            message: "Which Design System Library",
            type: "list",
            choices: Object.keys(ds),
        }
    ]).then(function (answers) {
        console.log("answers", answers);
        var dsConfig = ds[answers.ds];
        if (dsConfig) {
            dsConfig.cpFolderStructure.map(function (p) {
                ncp_1.ncp(__dirname + "/../" + p, process.cwd(), function (err) {
                    console.error(err);
                });
            });
            add_deps_1.addDeps({
                "scripts": dsConfig.scripts,
                "dependencies": dsConfig.dependencies,
                "devDependencies": dsConfig.devDependencies
            });
            inquirer_1.default.prompt(dsConfig.prompts).then(dsConfig.handler);
            console.log("Finished.");
        }
        else {
            console.error("Cant load config");
        }
    });
}
function newStylesSystem() {
    inquirer_1.default.prompt([
        {
            name: "styles",
            message: "Which Preprocessor",
            type: "list",
            choices: Object.keys(ds),
        }
    ]).then(function (answers) {
        console.log("answers", answers);
        var dsConfig = ds[answers.ds];
        if (dsConfig) {
            dsConfig.cpFolderStructure.map(function (p) {
                ncp_1.ncp(__dirname + "/../" + p, process.cwd(), function (err) {
                    console.error(err);
                });
            });
            add_deps_1.addDeps({
                "scripts": dsConfig.scripts,
                "dependencies": dsConfig.dependencies,
                "devDependencies": dsConfig.devDependencies
            });
            inquirer_1.default.prompt(dsConfig.prompts).then(dsConfig.handler);
            console.log("Finished.");
        }
        else {
            console.error("Cant load config");
        }
    });
}
//# sourceMappingURL=index.js.map