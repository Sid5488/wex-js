import http from "http";
import fs from "fs";
import path from "path";
import os from "os";

import { __dirname } from "./helpers/__dirname.mjs";

const server = http.createServer((req, res) => {
  const filePath = 
    req.url.includes("/src") || 
    req.url.includes("/lib") || 
    req.url.includes("/public") 
      ? req.url
      : '/public/index.html';

  const osOperating = os.platform() === "win32" ? "win32" : "linux";

	const [dirname] = osOperating === "win32" 
    ? __dirname.split("\\lib") 
    : __dirname.split("/lib");

  const fullPath = path.join(dirname, filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const contentType = getContentType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });

    res.end(data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

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
