const fs = require("fs");
const less = require("gulp-less");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const { src, dest, watch, series, task } = require("gulp");
const browserSync = require("browser-sync").create();
const liveReload = require("gulp-livereload");

const CSS_COMPILERS = {
  less: {
    name: "less",
    cb: () => less().on("error", error => console.log(error))
  },
  sass: {
    name: "sass",
    cb: () => sass().on("error", sass.logError)
  }
};

function createSyncWithBrowser(cb) {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
}

function compileCss(compilerName = CSS_COMPILERS.less.name) {
  const targetFileName = `main.${compilerName}`;
  const path = `src/styles/${targetFileName}`;
  const fileExists = fs.existsSync(path);
  return (
    fileExists &&
    src(path)
      .pipe(CSS_COMPILERS[compilerName].cb())
      .pipe(dest("./dist/styles"))
      .pipe(browserSync.stream())
  );
}

function pipeHtml(cb) {
  return src("./src/index.html")
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());
}

function pipeImages(cb) {
  return src("src/images/**.*").pipe(dest("./dist/images"));
}

function pipeFonts(cb) {
  return src("src/fonts/**.*").pipe(dest("./dist/fonts"));
}

function pipeJs(cb) {
  return src("src/js/**.js").pipe(dest("./dist/js"));
}

const startSeries = cssCompilerName => {
  pipeImages();
  pipeHtml();
  pipeFonts();
  pipeImages();
  compileCss(cssCompilerName);
  pipeJs();
};

function watchChanges(cssCompilerName) {
  watch(
    "./src",
    series(pipeImages, pipeHtml, pipeFonts, pipeImages, pipeJs, () =>
      compileCss(cssCompilerName)
    )
  );
}

function initCompile(cssCompilerName) {
  startSeries(cssCompilerName);
  createSyncWithBrowser();
  liveReload.listen();
}

function startTasks(cssCompilerName) {
  watchChanges(cssCompilerName);
  initCompile(cssCompilerName);
}

// tasks
task("less", () => {
  const { name } = CSS_COMPILERS.less;
  startTasks(name);
});

task("sass", () => {
  const { name } = CSS_COMPILERS.sass;
  startTasks(name);
});

exports.default = () => {};
