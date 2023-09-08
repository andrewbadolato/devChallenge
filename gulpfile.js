//Settings
//Set to "false" to turn off build features
var settings = {
  sass: true,
  autoprefix: true,
  sourcemaps: false,
  combinemq: true,
};

//Project folder paths
var paths = {
  scss: "src/scss/**/*.scss",
  input: "dist/css/**/*.css",
  output: "dist/css/",
};

//Message strings
var messages = {
  disabled:
    ' disabled. Re-enable it by changing "false" to "true" in the gulpfile.js settings.',
  input: " running on " + paths.input,
  output: " saving to " + paths.output,
};

//Packages
var { gulp, src, dest, series } = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sass = require("gulp-sass")(require("sass"));
var sourcemaps = require("gulp-sourcemaps");
var combine = require("postcss-combine-media-query");

//Functions
function getFuncName() {
  return getFuncName.caller.name;
}

//Gulp tasks
var sasscss = function (done) {
  if (!settings.sass) {
    console.log(getFuncName() + messages.disabled);
    return done();
  } else {
    return src(paths.scss)
      .pipe(sass().on("error", sass.logError))
      .pipe(dest(paths.output), console.log(getFuncName() + messages.output));
  }
};

var autoprefix = function (done) {
  if (!settings.autoprefix) {
    console.log(getFuncName() + messages.disabled);
    return done();
  } else {
    return src(paths.input)
      .pipe(
        postcss([autoprefixer()]),
        console.log(getFuncName() + messages.input)
      )
      .pipe(dest(paths.output), console.log(getFuncName() + messages.output));
  }
};

var sourcemap = function (done) {
  if (!settings.sourcemaps) {
    console.log(getFuncName() + messages.disabled);
    return done();
  } else {
    return src(paths.input)
      .pipe(sourcemaps.init(), console.log(getFuncName() + messages.input))

      .pipe(sourcemaps.write("."))
      .pipe(dest(paths.output), console.log(getFuncName() + messages.output));
  }
};

var combinemq = function (done) {
  if (!settings.combinemq) {
    console.log(getFuncName() + messages.disabled);
    return done();
  } else {
    return src(paths.input)
      .pipe(postcss([combine()]), console.log(getFuncName() + messages.input))
      .pipe(dest(paths.output), console.log(getFuncName() + messages.output));
  }
};

//Export tasks
exports.default = series(sasscss, autoprefix, sourcemap, combinemq);
exports.sasscss = series(sasscss);
exports.autoprefix = series(autoprefix);
exports.sourcemap = series(sourcemap);
exports.combinemq = series(combinemq);
