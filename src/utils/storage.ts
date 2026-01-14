import { Gasto } from '../types/Gasto';

const STORAGE_KEY = 'gastos_app';

export const guardarGastos = (gastos: Gasto[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));
};

export const obtenerGastos = (): Gasto[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const agregarGasto = (gasto: Gasto): void => {
  const gastos = obtenerGastos();
  gastos.push(gasto);
  guardarGastos(gastos);
};

export const eliminarGasto = (id: string): void => {
  const gastos = obtenerGastos();
  const gastosActualizados = gastos.filter(g => g.id !== id);
  guardarGastos(gastosActualizados);
};