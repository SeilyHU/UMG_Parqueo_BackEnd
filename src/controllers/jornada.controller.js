const store = require('../store/jornada.store');

async function getJornadas() {
    return await store.list();
}

async function addJornada(body) {
    if (!body.tipo) throw new Error('El Tipo de Jornada es obligatorio.');
    const data = {
        tipo: body.tipo,
        descripcion: body.descripcion || 'Sin descripción'
    };
    return await store.add(data);
}

async function updateJornada(id, body) {
    if (!id) throw new Error('ID requerido');
    return await store.update(id, { 
        tipo: body.tipo, 
        descripcion: body.descripcion 
    });
}

async function deleteJornada(id) {
    return await store.remove(id);
}

module.exports = { getJornadas, addJornada, updateJornada, deleteJornada };