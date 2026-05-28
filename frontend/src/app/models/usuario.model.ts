export interface Perfil {
  nombre: string;
  apellido: string;
  edad?: number;
  telefono?: string;
  documento_identidad?: string;
  foto_perfil?: string;
}

export interface Usuario {
  id?: number;
  rol: string;
  correo: string;
  contrasena?: string; // used for forms
  perfil?: Perfil;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    rol: string;
    nombre: string;
    foto: string;
  };
}
