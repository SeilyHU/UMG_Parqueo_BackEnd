class Jornada {
    constructor(id, tipo, descripcion) {
        this.JD_Jornada = id;          // NUMBER(19)
        this.JD_TipoJornada = tipo;    // VARCHAR2(50)
        this.JD_Descripcion = descripcion; // VARCHAR2(100)
    }
}

module.exports = Jornada;