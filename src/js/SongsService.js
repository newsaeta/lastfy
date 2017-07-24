const $ = require("jquery");

export default class SongService {

    constructor(url) {
        this.url = url;
    }

    // Obtener listado canciones
    list(sucessCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: sucessCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar canción
    save(song, sucessCallback, errorCallback) {
        if(song.id){
            this.update(song, sucessCallback, errorCallback);
        }else{
            this.create(song, sucessCallback, errorCallback);
        }
    }

    // Crear una canción
    create(song, sucessCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            method: "post",
            data: song,
            success: sucessCallback,
            error: errorCallback
        });
    }

    // Obtener el detalle de la cancion
    getDetail(songId, sucessCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songId}`,
            success: sucessCallback,
            error: errorCallback
        })
    }

    // Actualizar una cancion
    update(song,sucessCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${song.id}`,
            method: "put",
            data: song,
            success: sucessCallback,
            error: errorCallback
        });
    }

    // Borrar una cancion
    delete(songId, sucessCallback, errorCallback) {
        $.ajax({
            url:`${this.url}${songId}`,
            method: "delete", // porque que es una peticion a la api como metodo delete
            success: sucessCallback,
            error: errorCallback
        })
    }

}