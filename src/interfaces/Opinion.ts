export interface Opiniones {
  id:            number;
  calificacion:  number;
  comentario:    string;
  fecha_opinion: Date;
  propiedad_id:  number;
  usuario_id:    number;
  propiedade:    Propiedade;
  usuario:       Usuario;
}

export interface Propiedade {
  titulo: string;
}

export interface Usuario {
  nombre:   string;
  apellido: string;
}
