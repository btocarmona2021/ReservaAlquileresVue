export interface PropiedadDetalles {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  precio_por_noche: string;
  capacidad_personas: number;
  tipo_propiedad: string;
  imagen_principal: string;
  propiedad_comodidades: PropiedadComodidad[];
  imagenes_propiedads: ImagenesPropiedad[];
  opinions: Opinion[];
  tarifas: Tarifa[];
}

export interface PropiedadComodidad {
  id: number;
  comodidade: Comodidad;
}

export interface Comodidad {
  nombre: string;
  icono:string;
}

export interface ImagenesPropiedad {
  id: number;
  ruta_imagen: string;
}

export interface Opinion {
  id: number;
  calificacion: number;
  comentario: string;
  usuario: Usuario;
}

export interface Usuario {
  nombre: string;
  apellido: string;
  direccion: string;
  tipo_usuario: string;
  foto_perfil: string | null;
}

export interface Tarifa {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  precio: string;
  propiedad_id: number;
}
