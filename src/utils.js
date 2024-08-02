import colors from 'colors';
import figures from 'figures';
import path from "path";
import { fileURLToPath } from "url";
import { cwd } from "process";
import fs from "fs";
import {
    writeFile,
    lstat,
    readdir,
    mkdir,
    copyFile,
    readFile,
    rm,
    rename
} from "fs/promises";


export async function build({ name, options }) {
    try {
        const targetDir = path.join(cwd(), name);
        let sourceDir;

        // Check if there are no options selected
        if (options.length == 0) {
            console.log(colors.red("No options selected"));
            return;
        }

        // Check if TypeScript is selected and set the source directory
        if (options.ts) {
            sourceDir = path.resolve(
                fileURLToPath(import.meta.url),
                "../../templates/server-ts"
            );
        }
        else {
            sourceDir = path.resolve(
                fileURLToPath(import.meta.url),
                "../../templates/server"
            );
        }

        // Create the target directory if it doesn't exist and copy files and directories
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });

            // Copy files and directories from source to target directory
            await copyFilesAndDirectories(sourceDir, targetDir);
            // Update package.json with selected options
            await updatePackageJson(targetDir, name, options);
            // Update main.js with selected options
            await updateMainJs(targetDir, options);
            // Update folders based on selected options
            await updateFolders(targetDir, options);

            console.log(colors.green(`${figures.tick} Finished generating your project ${colors.bold(name)}`));
            console.log(`\n\n${colors.white.underline('Please follow the steps below:')}\n`);
            console.log(`\t1. Navigate to your project using: ${colors.underline('cd ' + name)}`);
            console.log(`\t2. Install dependencies: ${colors.green('npm install')}`);
            console.log(`\t3. Open VS Code: ${colors.blue('code ./')}`);
            console.log(`\n${figures.smiley} Happy Coding...\n`);
        } else {
            throw new Error("Target directory already exist!");
        }
    } catch (error) {
        console.log(colors.bgRed.white(error.message));
    }
}

async function copyFilesAndDirectories(source, destination) {
    const entries = await readdir(source);

    for (const entry of entries) {
        const sourcePath = path.join(source, entry);
        const destPath = path.join(destination, entry);

        const stat = await lstat(sourcePath);

        if (stat.isDirectory()) {
            // Create the directory in the destination
            await mkdir(destPath);

            // Recursively copy files and subdirectories
            await copyFilesAndDirectories(sourcePath, destPath);
        } else {
            // Copy the file
            await copyFile(sourcePath, destPath);
        }
    }
}

async function updatePackageJson(targetDir, name, options) {
    const packageJsonPath = path.join(targetDir, "package.json");
    try {
        const packageJsonData = await readFile(packageJsonPath, "utf8");
        const packageJson = JSON.parse(packageJsonData);
        packageJson.name = name;

        if (options.includes("MongoDB")) {
            packageJson.dependencies = {
                ...packageJson.dependencies,
                mongodb: "^6.7.0",
            }
        }

        if (options.includes("SQL")) {
            packageJson.dependencies = {
                ...packageJson.dependencies,
                mssql: "^10.0.2",
            }
        }


        if (options.includes("Handelbars")) {
            packageJson.dependencies = {
                ...packageJson.dependencies,
                "express-handlebars": "^7.1.3",
            }
        }


        await writeFile(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
            "utf8"
        );

    } catch (err) {
        console.log(err.message);
    }
}

async function updateMainJs(targetDir, options) {
    const mainTxtPath = path.join(targetDir, "main.txt");
    try {
        const mainTxtData = await readFile(mainTxtPath, "utf8");
        let mainTxt = mainTxtData

        if (options.includes("Handelbars")) {
            mainTxt = mainTxt.replace("{{VIEW_IMPORT}}", "import path from 'path';\nimport { engine } from 'express-handlebars';\n");
            mainTxt = mainTxt.replace("{{VIEW_ROUTE}}", "import viewRouter from './views/views.routes.js';\n");
            mainTxt = mainTxt.replace("{{STATIC_FILES}}", "//STATIC FILES\nserver.use('/static', express.static(path.join(__dirname, 'views/static/')));\n");
            mainTxt = mainTxt.replace("{{VIEW_ENGINE}}", "//VIEW ENGINE\nserver.engine('.hbs', engine({extname: '.hbs'}));\nserver.set('view engine', '.hbs');\nserver.set('views', path.join(__dirname, 'views/'));\n");
            mainTxt = mainTxt.replace("{{VIEW_END}}", "server.use('/', viewRouter);\n");
        }
        else {
            mainTxt = mainTxt.replace("{{VIEW_IMPORT}}", "");
            mainTxt = mainTxt.replace("{{VIEW_ROUTE}}", "");
            mainTxt = mainTxt.replace("{{STATIC_FILES}}", "");
            mainTxt = mainTxt.replace("{{VIEW_ENGINE}}", "");
            mainTxt = mainTxt.replace("{{VIEW_END}}", "");
        }

        if (options.includes("MongoDB") || options.includes("SQL")) {
            mainTxt = mainTxt.replace("{{API_ROUTE}}", "import charactersRouter from './characters/characters.routes.js';\n");
            mainTxt = mainTxt.replace("{{API_END}}", "server.use('/api/characters', charactersRouter);\n");
        } else {
            mainTxt = mainTxt.replace("{{API_ROUTE}}", "");
            mainTxt = mainTxt.replace("{{API_END}}", "");
        }

        await writeFile(mainTxtPath, mainTxt, "utf8");
        await rename(path.join(targetDir, "main.txt"), path.join(targetDir, "main.js"));
    } catch (err) {
        console.log(err.message);
    }
}

async function updateFolders(targetDir, options) {

    if (!options.includes("Handelbars")) {
        await rm(path.join(targetDir, 'views'), { recursive: true, force: true });
    }

    if (!options.includes("MongoDB")) {
        await rm(path.join(targetDir, 'characters-mongo'), { recursive: true, force: true });
    }

    if (!options.includes("SQL")) {
        await rm(path.join(targetDir, 'characters-sql'), { recursive: true, force: true });
    }

    if (options.includes("MongoDB") && !options.includes("SQL")) {
        await rename(path.join(targetDir, 'characters-mongo'), path.join(targetDir, 'characters'));
    }

    if (options.includes("SQL") && !options.includes("MongoDB")) {
        await rename(path.join(targetDir, 'characters-sql'), path.join(targetDir, 'characters'));
    }
}
