const fs = require('fs');

const filterHiddenFiles = val => val[0] !== '.';

const createFontObjFromDir = (basePath) => {
  const dirArray = fs.readdirSync(basePath).filter(filterHiddenFiles);

  return dirArray.reduce((acc, file) => {
    const filePath = `${basePath}/${file}`;
    if (fs.lstatSync(filePath).isDirectory()) {
      acc[file] = createFontObjFromDir(filePath);
      return acc;
    }

    const fontName = basePath.split('fonts/')[1].replace('/', '-');

    // {
    //   archer: {
    //     "italic": {
    //      "0.woff": {
    //        path: "archer/italic/0.woff",
    //        name: "0",
    //        format: "woff",
    //        fontName: "archer-italic-0"
    //      }
    //     },
    //     "0.woff":{
    //      path: "archer/0.woff",
    //      weight: "0",
    //      format: "woff"
    //      fontName: "archer-0"
    //     }
    //   },
    // }
    acc[file] = {
      path: `${basePath.split('fonts')[1]}/${file}`,
      weight: file.split('.')[0],
      format: file.split('.')[1],
      fontName,
    };

    return acc;
  }, {});
};

const createFontStyles = (baseFontClassName, fontBranch) =>
  Object.entries(fontBranch)
  .reduce((acc, [fontBranchKey, fontBranchObj]) => {
    const { format, path, weight, fontName } = fontBranchObj;

    if (!path) {
      return acc + createFontStyles(fontName, fontBranchObj);
    }

    const fontFamily = `${fontName}-${weight}`;

    return `${acc}

      @font-face {
        font-family: '${fontFamily}';
        src: url('${path}') format('${format}');
      }
      .${fontFamily} {
        font-family: '${fontFamily}';
      }`;
  },
  ''
);

const createFontMarkup = (baseFontName, fontBranch) =>
  Object.entries(fontBranch)
  .reduce((acc, [fontBranchKey, fontBranchObj]) => {
    const { weight, path, fontName } = fontBranchObj;
    const className = `${fontName}-${weight}`;

    let fontTitle = baseFontName.length ? `${baseFontName}-` : '';
    fontTitle += fontBranchKey;

    if (path) {
      return `${acc}
        <li class="${className}">${className} Pack my box with five dozen liquor jugs</li>
      `;
    }

    return `${acc}
      <h2>${fontTitle}</h2>
      <ul>
        ${createFontMarkup(fontBranchKey, fontBranchObj)}
      </ul>
    `;
  },
  ''
);

const makeFontView = fontModel => `<!doctype html>
  <html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Fonty McFontface</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>
      li {
        list-style: none;
      }
      ${createFontStyles('', fontModel)}
    </style>
  </head>
  <body>
    <h1>Fonty McFontface</h1>
    ${createFontMarkup('', fontModel)}
  </body>
</html>`;


const docs = () => {
  const fontModel = createFontObjFromDir('fonts');
  const fontView = makeFontView(fontModel);

  return (req, res) => {
    res.send(fontView);
  };
};

module.exports = docs;
