var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");


//definicmos la tarea por defecto
gulp.task("default",["html","compile-sass"], function(){
    // iniciamos el servidor de desarrollo
    browserSync.init({ server: "dist/"});
    //proxy: "http://127.0.0.0:8080" para otro backend cambiamos server por proxy

    // observa cambios en los archivos SASS y ejecuta las tarea compile-sass
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["compile-sass"]);
    
    // observa los cambios en los archivos html y recarga el navegador
    // gulp.watch("src/*.html").on("change", browserSync.reload);
    // observa los cambios en los archivos html y recarga el navegador
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);
})

//compilar sass
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") //cargamos el archivo styles.scsss
        .pipe(sass().on("error", sass.logError)) //lo compilamos con gulp-sass
        .pipe(gulp.dest("dist/css")) // lo guardamos en la carpeta css
        .pipe(browserSync.stream()) // recarga el css del navegador
        .pipe(notify("SASS Compilado 😎 ")) //muestra notificacion en pantalla

});

//Copiar e importar html
gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        .pipe(notify("html importado"));
});