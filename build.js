const fs = require('fs');
const path = require('path');
const { minify: minifyJS } = require('terser');
const { minify: minifyHTML } = require('html-minifier-terser');

async function copyDirectory(src, dest, toIgnore = []) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    // is ignored folder/file
    if (toIgnore.find(v => srcPath.includes(v)))
      console.debug("ignored path", { path: srcPath });
    // is directory
    else if (fs.statSync(srcPath).isDirectory())
      await copyDirectory(srcPath, path.join(dest, file), toIgnore);
    // is files
    else switch (path.extname(file)) {
      case ".js'":
        fs.writeFileSync(path.join(dest, file), (await minifyJS(
          fs.readFileSync(srcPath, 'utf-8')
        )).code);
        break;
      case ".html":
        fs.writeFileSync(path.join(dest, file), await minifyHTML(
          fs.readFileSync(srcPath, 'utf-8'), {
          minifyCSS: true,
          collapseWhitespace: true,
          removeComments: true,
        }));
        break;
      default:
        fs.copyFileSync(srcPath, path.join(dest, file));
        break;
    }
  }
}

(async () => {
  const distFolder = path.resolve(__dirname, "dist");
  const wwwFolder = path.resolve(__dirname, "www");
  const i18nFolder = path.join(wwwFolder, "i18n");
  const assetsFolder = path.join(wwwFolder, "assets");

  // clear dist (dev)
  if (fs.existsSync(distFolder))
    fs.rmSync(distFolder, { recursive: true }, (e) => console.log(e));

  // get i18n lang
  const i18n = fs.readdirSync(i18nFolder)
    .filter(file => path.extname(file) === '.json')
    .map(file => ({ file, lang: file.split(".")[1] }));

  // process: build website
  {
    for (const v of i18n) {
      const i18distFolder = path.join(distFolder, v.lang.toUpperCase());
      // copy file from www to i18n dist (dist/EN, dist/FR, dist/ES, ...)
      await copyDirectory(wwwFolder, i18distFolder, [
        i18nFolder,
        assetsFolder,
        ".js", "privacy-policy.txt",
      ])
      // copy html from i18n folder to i18n dist
      await copyDirectory(i18nFolder, i18distFolder, [
        ".json"
      ])
    }
    // copy file from www to dist (dist/**)
    await copyDirectory(wwwFolder, distFolder, [
      i18nFolder,
      ".html"
    ]);
  }

  // process: check if privacy-policy.txt has changed
  {
    const urlToPrivacy = "https://raw.githubusercontent.com/jtorleon-studios-team/.github/refs/heads/main/www/privacy-policy.txt";
    const privacyFile = path.resolve(wwwFolder, "privacy-policy.txt");
    if (!fs.existsSync(distFolder)) {
      throw new Error("missing privacy-policy.txt")
    }
    const versionRegex = /\[privacy-version:(\d*)\]/;
    const localSourcePrivacy = fs.readFileSync(privacyFile, 'utf-8');
    const localMatchVersion = localSourcePrivacy.match(versionRegex)
    if (localMatchVersion === null) {
      throw new Error("missing privacy-version in file privacy-policy.txt")
    }

    const hostedSourcePrivacy = await fetch(urlToPrivacy).then(r => r.text()).catch(e => "invalid");
    const hostedMatchVersion = hostedSourcePrivacy.match(versionRegex);
    if (hostedMatchVersion === null) {
      console.error("missing privacy-version in hosted file privacy-policy.txt")
    } else if (localMatchVersion[1] === hostedMatchVersion[1]) {
      console.log("same")
    } else {
      console.log("diff")
    }
  }
})(); 
