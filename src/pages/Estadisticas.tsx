import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/react';
import { obtenerGastos } from '../utils/storage';
import { Gasto } from '../types/Gasto';

const Estadisticas: React.FC = () => {
  const [totalHoy, setTotalHoy] = useState(0);
  const [totalMes, setTotalMes] = useState(0);
  const [gastosPorCategoria, setGastosPorCategoria] = useState<Record<string, number>>({});

  useEffect(() => {
    calcularEstadisticas();
    
    const interval = setInterval(() => {
      calcularEstadisticas();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const calcularEstadisticas = () => {
    const gastos = obtenerGastos();
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    let sumaHoy = 0;
    let sumaMes = 0;
    const categorias: Record<string, number> = {};

    gastos.forEach((gasto: Gasto) => {
      const fechaGasto = new Date(gasto.fecha);
      
      if (fechaGasto.toDateString() === hoy.toDateString()) {
        sumaHoy += gasto.monto;
      }
      
      if (fechaGasto >= inicioMes) {
        sumaMes += gasto.monto;
        categorias[gasto.categoria] = (categorias[gasto.categoria] || 0) + gasto.monto;
      }
    });

    setTotalHoy(sumaHoy);
    setTotalMes(sumaMes);
    setGastosPorCategoria(categorias);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resumen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Total de Hoy</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText color="primary">
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>
                ${totalHoy.toFixed(2)}
              </h1>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Total del Mes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText color="secondary">
              <h1 style={{ fontSize: '2.5rem', margin: 0 }}>
                ${totalMes.toFixed(2)}
              </h1>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Gastos por Categoría (Este Mes)</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {Object.keys(gastosPorCategoria).length === 0 ? (
              <IonText color="medium">
                <p>No hay datos disponibles</p>
              </IonText>
            ) : (
              <IonList>
                {Object.entries(gastosPorCategoria)
                  .sort(([, a], [, b]) => b - a)
                  .map(([categoria, monto]) => (
                    <IonItem key={categoria}>
                      <IonLabel>{categoria}</IonLabel>
                      <IonText slot="end" color="primary">
                        ${monto.toFixed(2)}
                      </IonText>
                    </IonItem>
                  ))}
              </IonList>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Estadisticas;