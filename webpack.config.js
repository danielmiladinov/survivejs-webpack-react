const path = require('path');
const FOLDERS = ['app', 'build'];
const PATHS = FOLDERS.reduce(
  (ps, f) => Object.assign(ps, { [f]: path.join(__dirname, f) }), 
  {}
);

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  }
};
