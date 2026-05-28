exports.validateRegistration = (data) => {
  const { rol, correo, contrasena, edad } = data;
  
  if (!correo || !contrasena || !rol) {
    return 'Faltan campos requeridos (correo, contrasena, rol).';
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(correo)) {
    return 'El correo no es válido.';
  }

  if (contrasena.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (rol === 'voluntario') {
    if (!edad || edad < 18 || edad > 50) {
      return 'Los voluntarios deben tener entre 18 y 50 años.';
    }
  } else if (rol === 'adulto mayor') {
    if (!edad || edad < 60 || edad > 90) {
      return 'Los adultos mayores deben tener entre 60 y 90 años.';
    }
  } else {
    return 'Rol inválido.';
  }

  return null;
};
