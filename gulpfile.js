var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");


//definicmos la tarea por defecto
gulp.task("default",["html","compile-sass", "js"], function(){
    // iniciamos el servidor de desarrollo
    browserSync.init({ server: "dist/"});
    //proxy: "http://127.0.0.0:8080" para otro backend cambiamos server por proxy

    // observa cambios en los archivos SASS y ejecuta las tarea compile-sass
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["compile-sass"]);
    
    // observa los cambios en los archivos html y recarga el navegador
    // gulp.watch("src/*.html").on("change", browserSync.reload);
    // observa los cambios en los archivos html y recarga el navegador
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);

     // observa cambios en los archivos JS y entonces ejecuta la tarea 'js'
    gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
})

//compilar sass
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") //cargamos el archivo styles.scsss
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError)) //lo compilamos con gulp-sass
        .pipe(sourcemaps.write("./"))
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

gulp.task("js", function(){
    gulp.src("src/js/main.js")
        .pipe(tap(function(file){ // tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero
            file.contents = browserify(file.path, {debug:true}) // creamos una instancia de browserify en base al archivo
                            .transform("babelify", {presets: ["es2015"]}) // traduce nuestro codigo de ES6 -> ES5
                            .bundle() // compilamos el archivo
                            .on("error", function(error){ // en caso de error, mostramos una notificación
                                return notify().write(error);
                            });
        }))
        .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/")) // lo guardamos en la carpeta dist
        .pipe(browserSync.stream()) // recargamos el navegador
        .pipe(notify("JS Compilado"));
});