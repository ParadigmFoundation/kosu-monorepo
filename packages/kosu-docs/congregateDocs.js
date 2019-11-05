#!/usr/bin/env node
"use strict";

const fs = require("fs");
const { spawn } = require("child_process");

fs.readdir("..", (err, packages) => {
    for (const _package of packages) {
        if (["kosu-docs", ".DS_Store"].includes(_package)) {
            continue;
        }
        fs.readdir(`../${_package}`, (err, dirs) => {
            if (dirs.includes("docs")) {
                spawn("cp", ["-r", `../${_package}/docs`, `./docs/${_package}`]);
            }
        });
    }
});
