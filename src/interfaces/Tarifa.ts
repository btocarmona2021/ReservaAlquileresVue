export interface Tarifa {
  id: number;
  fecha_inicio: string;
  fecha_fin: string;
  precio: string;
  propiedad_id: number | null;
  propiedade: {
    titulo: string;
  };
}
