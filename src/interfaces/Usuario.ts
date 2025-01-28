export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string | null;
  tipo_usuario: 'cliente' | 'administrador'; // Puedes ajustar esto si tienes otros tipos de usuarios
  foto_perfil: string;
  contrasena_encriptada: string;
}
