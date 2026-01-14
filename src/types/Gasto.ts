export interface Gasto {
  id: string;
  monto: number;
  categoria: string;
  fecha: string;
  descripcion?: string;
}

export const CATEGORIAS = [
  'Comida',
  'Transporte',
  'Entretenimiento',
  'Servicios',
  'Salud',
  'Compras',
  'Otros'
];