class Asignacion {
    constructor(id, estado, usuarioId, espacioId, semestreId, jornadaId, fecha = new Date()) {
        this.AS_Asignacion = id;           // NUMBER(19)
        this.AS_FechaAsignacion = fecha;   // DATE
        this.AS_Estado = estado;           // NUMBER(1)
        this.US_Identificacion = usuarioId;// FK -> DP_USUARIO
        this.ES_Espacio = espacioId;       // FK -> DP_ESPACIO
        this.SM_Semestre = semestreId;     // FK -> DP_SEMESTRE
        this.JD_Jornada = jornadaId;       // FK -> DP_JORNADA
    }
}

module.exports = Asignacion;