import http from "http";
import fs from "fs";
import path from "path";
import os from "os";

import { __dirname } from "./helpers/__dirname.mjs";

const args = process.argv;
let runtimeEnv = undefined;
if (args.includes('--env')) {
  args.forEach((arg, index) => {
    if (arg === '--env') {
      runtimeEnv = args[index + 1];
    }
  });
}

/**
 * Creates an HTTP server to serve static files.
 * @param {http.IncomingMessage} req - The request object.
 * @param {http.ServerResponse} res - The response object.
 */
const server = http.createServer((req, res) => {
  /**
   * Determines the file path based on the request URL.
   * @type {string}
   */
  const filePath = 
    req.url.includes("/src") || 
    req.url.includes("/lib") || 
    req.url.includes("/public") 
      ? req.url
      : '/public/index.html';

  /**
   * Determines the operating system for handling file paths.
   * @type {string}
   */
  const osOperating = os.platform() === "win32" ? "win32" : "linux";

  const [removeNodeModules] = __dirname.split("/node_modules");

  /**
	 * Separates the base path for static files based on the operating system.
	 * @type {string[]}
	 */
	const [dirname] = osOperating === "win32" 
    ? removeNodeModules.split("\\lib") 
    : removeNodeModules.split("/lib");

  /**
   * Gets the full path of the file.
   * @type {string}
   */
  const fullPath = path.join(dirname, filePath);

  /**
   * Reads the content of the file.
   * @param {Error} err - The error object.
   * @param {Buffer} data - The data read from the file.
   */
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const contentType = getContentType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });

    let content = data.toString('utf-8')
    if (content.includes("<!DOCTYPE html>")) {
      const [before, after] = content.split("<!-- **importmap -->");
      const wex = runtimeEnv === 'internalDev'
        ? '../lib/index.mjs'
        : '../node_modules/wex-js/lib/index.mjs';

      const importmap = `
        <script type="importmap">
          {
            "imports": {
              "wex-js": "${wex}"
            }
          }
        </script>
      `;
      content = before + importmap + after;
      
      data = content;
    }

    res.end(data);
  });
});

/**
 * The port number that the server listens on.
 * @type {number}
 */
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

/**
 * Determines the content type based on the file extension.
 * @param {string} filePath - The path of the file.
 * @returns {string} The content type of the file.
 */
function getContentType(filePath) {
  const extname = path.extname(filePath);

  const contentType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpg": "text/jpeg",
    ".png": "text/png",
    ".mjs": "text/javascript"
  };
  
  return contentType[extname] ?? "text/plain";
}
