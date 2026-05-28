exports.validateSolicitud = (data) => {
  const { categoria, descripcion, direccion, fecha_servicio } = data;
  
  if (!categoria || !descripcion || !direccion || !fecha_servicio) {
    return 'Todos los campos son obligatorios.';
  }

  if (descripcion.length < 10) {
    return 'La descripción debe tener al menos 10 caracteres.';
  }

  const fecha = new Date(fecha_servicio);
  if (isNaN(fecha.getTime())) {
    return 'La fecha de servicio no es válida.';
  }

  return null;
};
