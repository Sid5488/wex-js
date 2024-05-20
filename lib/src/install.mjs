import fs from "fs";
import path from "path";

import { __dirname } from "./helpers/__dirname.mjs";

// Function to copy files and directories recursively
function copyFilesRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);

    files.forEach((file) => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFilesRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  } else {
    fs.copyFileSync(source, target);
  }
}

// Function to generate package.json
function generatePackageJson(projectName, destDir, libVersion) {
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'My project description',
    main: './node_modules/wex-js/lib/src/server.js',
    scripts: {
      start: 'wex start',
      test: 'echo "Error: no test specified" && exit 1'
    },
    author: 'Your Name',
    license: 'ISC',
    dependencies: {
      "wex-js": `^${libVersion}`
    }
  };

  fs.writeFileSync(
    path.join(destDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

const libPackageJsonPath = path.join(__dirname, "..", "package.json");
const libPackageJson = JSON.parse(fs.readFileSync(libPackageJsonPath, 'utf-8'));
const libVersion = libPackageJson.version;

const projectName = process.argv[2] || "my-app";
const sourceDir = path.join(__dirname, 'template');
const currentDir = path.join(process.cwd(), "..", "..");
const destDir = path.join(currentDir, projectName);

try {
  copyFilesRecursiveSync(sourceDir, destDir);
  generatePackageJson(projectName, destDir, libVersion);

  console.log(`Files copied and package.json generated successfully in ${destDir} directory!`);
} catch (err) {
  console.error(`Error copying files: ${err.message}`);
}
