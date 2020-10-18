import gulp from "gulp";
import sass from "gulp-sass";
import browserSync from "browser-sync";
browserSync.create();

// Compile scss into css
function style() {
  // 1. Where is my scss file
  return (
    gulp
      .src("./scss/**/*.scss")
      // 2. Pass that file through the sass compiler
      .pipe(sass().on("error", sass.logError))
      // 3. Where do I save the compiled css
      .pipe(gulp.dest("./css"))
      // 4. Stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./scss/**/*.scss", style);
  // Watch the html files on change
  gulp.watch("./**/*.html").on("change", browserSync.reload);
  // Watch the js files on change
  gulp.watch("./scripts/**/*.js").on("change", browserSync.reload);
}

export { style, watch };
