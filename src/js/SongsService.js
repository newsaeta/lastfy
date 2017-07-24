const $ = require("jquery");

export class SongService {

    constructor() {
        
    }

    // Obtener listado canciones
    list(sucessCallback, errorCallback) {
        $.ajax({
            url: "/songs/",
            success: sucessCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar canción
    save(song) {

    }

    // Crear una canción
    create(song) {

    }

    // Obtener el detalle de la cancion
    getDetail(songId) {

    }

    // Actualizar una cancion
    update(song) {

    }

    // Borrar una cancion
    delete(songId) {

    }

}