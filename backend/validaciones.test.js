const { validateRegistration } = require('./modules/auth/domain/validation');
const { validateSolicitud } = require('./modules/solicitudes/domain/validation');

describe('Pruebas de Validación de Registro (Auth)', () => {
  
  test('Caso de éxito: Datos válidos para un voluntario', () => {
    const datosValidos = {
      rol: 'voluntario',
      correo: 'test@veci.com',
      contrasena: 'password123',
      edad: 25
    };
    const resultado = validateRegistration(datosValidos);
    expect(resultado).toBeNull();
  });

  test('Caso de error: Edad inválida para un adulto mayor', () => {
    const datosInvalidos = {
      rol: 'adulto mayor',
      correo: 'abuelito@veci.com',
      contrasena: 'password123',
      edad: 45 // Muy joven para ser adulto mayor en nuestra lógica
    };
    const resultado = validateRegistration(datosInvalidos);
    expect(resultado).toBe('Los adultos mayores deben tener entre 60 y 90 años.');
  });

  test('Caso de error: Contraseña muy corta', () => {
    const datosInvalidos = {
      rol: 'voluntario',
      correo: 'test@veci.com',
      contrasena: '123',
      edad: 25
    };
    const resultado = validateRegistration(datosInvalidos);
    expect(resultado).toBe('La contraseña debe tener al menos 8 caracteres.');
  });
});

describe('Pruebas de Validación de Solicitud', () => {

  test('Caso de éxito: Solicitud con todos los campos correctos', () => {
    const solicitudValida = {
      categoria: 'Compras',
      descripcion: 'Necesito ayuda comprando el mercado de la semana.',
      direccion: 'Calle 123 #45-67',
      fecha_servicio: '2026-05-10'
    };
    const resultado = validateSolicitud(solicitudValida);
    expect(resultado).toBeNull();
  });

  test('Caso de error: Faltan campos obligatorios', () => {
    const solicitudInvalida = {
      categoria: 'Compañía',
      descripcion: 'Caminata corta',
      // falta direccion y fecha
    };
    const resultado = validateSolicitud(solicitudInvalida);
    expect(resultado).toBe('Todos los campos son obligatorios.');
  });

  test('Caso de error: Descripción demasiado corta', () => {
    const solicitudInvalida = {
      categoria: 'Trámites',
      descripcion: 'Ayuda', // < 10 caracteres
      direccion: 'Centro comercial',
      fecha_servicio: '2026-05-15'
    };
    const resultado = validateSolicitud(solicitudInvalida);
    expect(resultado).toBe('La descripción debe tener al menos 10 caracteres.');
  });
});
