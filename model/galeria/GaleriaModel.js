const db = require('../../banco/dbConexao');

module.exports = class GaleriaModel{

    static getTodos(callback){
        return db.query("SELECT * FROM galeria", callback);
    }

    static getId(id, callback){
        return db.query("SELECT * FROM galeria where id_galeria = ?",[id], callback);
    }

    static adicionar(dados, callback){
        return db.query("insert into galeria (titulo, camainho) values(?,?)",[dados.titulo, dados.camainho], callback);
    }


}