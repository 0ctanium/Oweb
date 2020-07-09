const escape = require('shell-quote').quote;
const isWin = process.platform === 'win32';

module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(' ');
    return [
      `prettier --with-node-modules --ignore-path --write ${escapedFileNames}`,
      `eslint --no-ignore --max-warnings=0 --fix ${filenames
        .map((f) => `"${f}"`)
        .join(' ')}`,
    ];
  },
  'pages/**/*.{js,jsx,ts,tsx}': (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(' ');
    return [
      `prettier --with-node-modules --ignore-path --write ${escapedFileNames}`,
      `eslint --no-ignore --max-warnings=0 --fix ${filenames
        .map((f) => `"${f}"`)
        .join(' ')}`,
    ];
  },
};
