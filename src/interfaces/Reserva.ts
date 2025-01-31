export interface Reserva {
  id: number;
  usuario_id: number;
  propiedad_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  fecha_pedido:string;
  precio_total: string;
  dias_reserva: number;
  usuario: Usuario;
  propiedade: Propiedade;
}
export interface Usuario {
  nombre: string;
  apellido: string;
  telefono: string;
  foto_perfil: string | null;
}

export interface Propiedade {
  titulo: string;
  tipo_propiedad: string;
}
