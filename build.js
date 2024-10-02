const fs = require('fs');
const path = require('path');
const { minify: minifyJS } = require('terser');
const { minify: minifyHTML } = require('html-minifier-terser');

async function copyDirectory(src, dest, toIgnore = []) {
  if (!fs.existsSync(src)) throw new Error("not found src");
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    if (toIgnore.find(v => srcPath.includes(v))) {
      console.debug("ignored path", { path: srcPath });
    } else if (fs.statSync(srcPath).isDirectory()) {
      await copyDirectory(srcPath, path.join(dest, file), toIgnore);
    } else {
      const extname = path.extname(file);
      let destPath = path.join(dest, file);
      if (extname === '.js') {
        const jsContent = fs.readFileSync(srcPath, 'utf-8');
        const minifiedJS = (await minifyJS(jsContent)).code;
        fs.writeFileSync(destPath, minifiedJS);
      } else if (extname === '.html') {
        const htmlContent = fs.readFileSync(srcPath, 'utf-8');
        const minifiedHTML = await minifyHTML(htmlContent, {
          minifyCSS: true,
          collapseWhitespace: true,
          removeComments: true,
        });
        fs.writeFileSync(destPath, minifiedHTML);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}


(async () => {
  const distFolder = path.resolve(__dirname, "dist");
  const wwwFolder = path.resolve(__dirname, "www");
  const i18nFolder = path.join(wwwFolder, "i18n");
  const assetsFolder = path.join(wwwFolder, "assets");

  if (fs.existsSync(distFolder))
    fs.rmSync(distFolder, { recursive: true }, (e) => console.log(e));

  const i18n = fs.readdirSync(i18nFolder)
    .filter(file => path.extname(file) === '.json')
    .map(file => ({ file, lang: file.split(".")[1] }));

  const process = [];
  for (const v of i18n) {
    const i18distFolder = path.join(distFolder, v.lang.toUpperCase());
    process.push(
      // copy file from www to i18n dist
      copyDirectory(wwwFolder, i18distFolder, [
        i18nFolder,
        assetsFolder,
        ".js", "privacy-policy.txt",
      ]),
      // copy html from i18n folder to i18n dist
      await copyDirectory(i18nFolder, i18distFolder, [
        ".json"
      ])
    );
  }

  process.push(copyDirectory(wwwFolder, distFolder, [
    i18nFolder,
    ".html"
  ]));

  await Promise.all(process);


})(); 
