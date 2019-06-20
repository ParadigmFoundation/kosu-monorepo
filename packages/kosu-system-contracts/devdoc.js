const json2md = require("json2md");
const fs = require("fs");
const path = require('path');

function parseMethods(devDoc) {
    const methods = [];
    const methodSignatures = Object.keys(devDoc.methods);

    // process each method
    for (const signature of methodSignatures) {
        const rawMethod = devDoc.methods[signature];

        const sigSplit = signature.split("(");
        const name = sigSplit[0];

        // parse params
        const params = [];
        const rawParams = rawMethod.params;
        const paramNames = rawParams ? Object.keys(rawParams) : [];
        const paramTypes = sigSplit[1] ? sigSplit[1].slice(0, -1).split(",") : [];

        for (let i = 0; i < paramNames.length; i++) {
            const paramName = paramNames[i];
            params.push({
                name: paramNames[i],
                type: paramTypes[i],
                desc: rawParams[paramName]
            })
        }

        // add method
        methods.push({
            name,
            signature,
            details: rawMethod.details,
            return: rawMethod.return,
            params
        });
    }
    return methods;
}

function parseMarkdown(devDoc, methods) {
    const output = []

    // Title and description
    output.push(
        { h1: devDoc.title || "" },
        { p: devDoc.details || "" },
    );

    // Table of contents
    const contents = [];
    for (const method of methods) {
        contents.push(`[${method.name}](${signatureToHyperLink(method.signature)})`);
    }
    output.push(
        { h2: "Contents" },
        {
            ul: [
                { link: { title: "Methods", url: "#methods" } },
                {
                    ul: contents,
                },
            ],
        },
    );

    // Methods
    output.push({ h2: "Methods" });
    for (const method of methods) {
        output.push(
            {
                h3: method.signature
            },
            { p: method.details || "?" },
        );

        if (method.params.length > 0) {
            table = {
                headers: ["Parameter", "Type", "Description"],
                rows: [],
            }
            for (const param of method.params) {
                table.rows.push({
                    Parameter: param.name,
                    Type: param.type || "?",
                    Description: param.desc
                });
            }
            output.push({ table });
        }
    }
    return output
}

function signatureToHyperLink(signature) {
    signature = signature.replace(/\(/g, "");
    signature = signature.replace(/\[/g, "");
    signature = signature.replace(/\]/g, "");
    signature = signature.replace(/,/g, "")
    return `#${signature.slice(0, -1)}`;
}

function main(_path, _output) {
    const outputs = [];
    const files = fs.readdirSync(path.resolve(_path));
    for (const file of files) {
        console.log(file)
        const contents = fs.readFileSync(path.resolve(_path, file), { encoding: "utf8" });
        const artifact = JSON.parse(contents);
        const devDoc = artifact.compilerOutput.devdoc;
        if (devDoc == {}) {
            return;
        }
        const methods = parseMethods(devDoc);
        const output = parseMarkdown(devDoc, methods);
        outputs.push([file, json2md(output)]);
    }
    for (const output of outputs) {
        const [inputFileName, outputFile] = output;
        const filename = inputFileName.split(".")[0].concat(".md");
        fs.writeFileSync(path.resolve(_output, filename), outputFile);
    }
}

main(process.argv[2], process.argv[3]);
