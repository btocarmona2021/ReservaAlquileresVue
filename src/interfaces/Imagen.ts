export interface Imagen {
  id:           number;
  ruta_imagen:  string;
  propiedad_id: number;
  propiedade:   Propiedade;
}

export interface Propiedade {
  titulo: string;
}
