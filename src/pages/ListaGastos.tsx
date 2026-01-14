import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonBadge,
  IonText
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import { obtenerGastos, eliminarGasto } from '../utils/storage';
import { Gasto } from '../types/Gasto';

const ListaGastos: React.FC = () => {
  const [gastos, setGastos] = useState<Gasto[]>([]);

  useEffect(() => {
    cargarGastos();
    
    const interval = setInterval(() => {
      cargarGastos();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const cargarGastos = () => {
    const gastosGuardados = obtenerGastos();
    setGastos(gastosGuardados.sort((a, b) => 
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    ));
  };

  const handleEliminar = (id: string) => {
    eliminarGasto(id);
    cargarGastos();
  };

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Gastos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mis Gastos</IonTitle>
          </IonToolbar>
        </IonHeader>

        {gastos.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '50%',
            padding: '20px'
          }}>
            <IonText color="medium">
              <p>No hay gastos registrados</p>
              <p>Agrega tu primer gasto</p>
            </IonText>
          </div>
        ) : (
          <IonList>
            {gastos.map((gasto) => (
              <IonItemSliding key={gasto.id}>
                <IonItem>
                  <IonLabel>
                    <h2>{gasto.categoria}</h2>
                    {gasto.descripcion && <p>{gasto.descripcion}</p>}
                    <p>{formatearFecha(gasto.fecha)}</p>
                  </IonLabel>
                  <IonBadge color="primary" slot="end">
                    ${gasto.monto.toFixed(2)}
                  </IonBadge>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption 
                    color="danger" 
                    onClick={() => handleEliminar(gasto.id)}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ListaGastos;