#!/usr/bin/env node
"use strict";

const fs = require("fs");
const { spawn } = require("child_process");

fs.readdir("./packages", (err, packages) => {
    for (const _package of packages) {
        if (["kosu-docs", ".DS_Store"].includes(_package)) {
            continue;
        }
        fs.readdir(`./packages/${_package}`, (err, dirs) => {
            if (dirs.includes("docs")) {
                spawn("cp", ["-r", `packages/${_package}/docs`, `packages/kosu-docs/docs/${_package}`]);
            }
        });
    }
});
