class Perfil {
  constructor({ id_usuario, nombre, apellido, edad, telefono, documento_identidad, foto_perfil, promedio_calificaciones }) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.telefono = telefono;
    this.documento_identidad = documento_identidad;
    this.foto_perfil = foto_perfil;
    this.promedio_calificaciones = promedio_calificaciones || 0;
  }

  validar() {
    if (!this.nombre || !this.apellido) {
      throw new Error('Nombre y apellido son requeridos');
    }
  }
}

module.exports = Perfil;
