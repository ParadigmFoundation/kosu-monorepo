const json2md = require("json2md");
const fs = require("fs");
const path = require("path");

const ARTIFACT_PATH = process.argv[2];
const OUTPUT_PATH = process.argv[3];

main(ARTIFACT_PATH, OUTPUT_PATH);

function main(_path, _output) {
    // stores [filename(string), markdownOutput (string)]
    const outputsArr = [];

    // only load directories with all JSON files (generated-artifacts)
    const files = fs.readdirSync(path.resolve(_path));

    for (const fileName of files) {
        const contents = fs.readFileSync(path.resolve(_path, fileName), { encoding: "utf8" });
        const artifact = JSON.parse(contents);

        let devDoc;
        try {
            devDoc = artifact.compilerOutput.devdoc;
        } catch (error) {
            throw new Error(`[devdocs] Incompatible contract artifacts in supplied directory.`);
        }

        // skip contracts with no devDocs
        if (devDoc == {} || !devDoc.title || !devDoc.details) {
            log(`skipping ${fileName} (no devdoc output)`, 2);
            continue;
        }

        // create custom data structure from devdoc compiler output, and convert to json2md input
        const methods = parseMethods(devDoc);
        const output = parseMarkdown(devDoc, methods);

        const mdOutputArr = [fileName, json2md(output)];
        outputsArr.push(mdOutputArr);
    }
    writeFiles(_output, outputsArr);
    log("done");
}

function writeFiles(_path, _outputs) {
    log("writing files");
    for (const output of _outputs) {
        const [inputFileName, outputFile] = output;

        // strip .json and use .md extension
        const filename = inputFileName.split(".")[0].concat(".md");

        log(`writing ${filename}`);
        fs.writeFileSync(path.resolve(_path, filename), outputFile);
    }
}

function log(message, level = 1) {
    const print = (l, m) => console.log(`${l} [devdoc] ${m}`);
    switch (level) {
        case 1:
            return print("I", message);
        case 2:
            return print("W", message);
        case 3:
            return print("ERR", message);
    }
}

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
                desc: rawParams[paramName],
            });
        }

        // add method
        methods.push({
            name,
            signature,
            details: rawMethod.details,
            return: rawMethod.return,
            params,
        });
    }
    return methods;
}

function parseMarkdown(devDoc, methods) {
    const output = [];

    if (!devDoc.title) {
        return;
    }

    // Title and description
    output.push({ h1: devDoc.title }, { p: devDoc.details });

    // Table of contents
    const contents = [];
    for (const method of methods) {
        const name = method.name;
        contents.push(`[${name}](#${name})`);
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
        // skip undocumented methods
        if (!method.details) {
            continue;
        }

        output.push(
            {
                h3: method.name,
            },
            { p: method.details },
            { h4: "Signature" },
            {
                code: {
                    language: "solidity",
                    content: method.name === "constructor"
                        ? `constructor(${getInternalSignature(method.params)})`
                        : `function ${method.name}(${getInternalSignature(method.params)})`,
                },
            },

        );

        if (method.params.length > 0) {
            table = {
                headers: ["Parameter", "Type", "Description"],
                rows: [],
            };
            for (const param of method.params) {
                table.rows.push({
                    Parameter: param.name,
                    Type: param.type || "?",
                    Description: param.desc,
                });
            }
            output.push(
                { h4: "Parameters:" },
                { table }
            );
        }

        if (method.return) {
            output.push({ h4: "Returns:" }, { p: method.return });
        }
    }
    return output;
}

function getInternalSignature(params) {
    let s = "";
    let c = 0;
    for (const param of params) {
        if (c++ > 0) {
            s = s.concat(", ")
        }

        // can't show types if they aren't there (not produced by devdoc)
        s = s.concat(`${param.name}${param.type ? ` ${param.type}` : ""}`);
    }
    return s;
}

function signatureToHyperLink(signature) {
    signature = signature.replace(/\(/g, "");
    signature = signature.replace(/\[/g, "");
    signature = signature.replace(/\]/g, "");
    signature = signature.replace(/,/g, "");
    return `#${signature.slice(0, -1)}`;
}
