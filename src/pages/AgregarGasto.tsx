import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCard,
  IonCardContent,
  IonToast
} from '@ionic/react';
import { agregarGasto } from '../utils/storage';
import { CATEGORIAS } from '../types/Gasto';

const AgregarGasto: React.FC = () => {
  const [monto, setMonto] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [mostrarToast, setMostrarToast] = useState(false);

  const handleSubmit = () => {
    if (!monto || !categoria) {
      return;
    }

    const nuevoGasto = {
      id: Date.now().toString(),
      monto: parseFloat(monto),
      categoria,
      fecha: new Date().toISOString(),
      descripcion: descripcion || undefined
    };

    agregarGasto(nuevoGasto);
    setMonto('');
    setCategoria('');
    setDescripcion('');
    setMostrarToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Gasto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonItem style={{ marginBottom: '1px', paddingTop: '1px', paddingBottom: '1px' }}>
              <IonLabel position="floating">Monto ($)</IonLabel>
              <IonInput
                type="number"
                value={monto}
                onIonInput={(e) => setMonto(e.detail.value!)}
                placeholder="0.00"
                style={{ marginTop: '20px' }}
              />
            </IonItem>

            <IonItem style={{ marginBottom: '1px', paddingTop: '1px', paddingBottom: '1px' }}>
              <IonLabel position="floating">Categoría</IonLabel>
              <IonSelect
                value={categoria}
                onIonChange={(e) => setCategoria(e.detail.value)}
                placeholder="Seleccionar"
                style={{ marginTop: '20px' }}
              >
                {CATEGORIAS.map((cat) => (
                  <IonSelectOption key={cat} value={cat}>
                    {cat}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem style={{ marginBottom: '1px', paddingTop: '1px', paddingBottom: '1px' }}>
              <IonLabel position="floating">Descripción (opcional)</IonLabel>
              <IonInput
                value={descripcion}
                onIonInput={(e) => setDescripcion(e.detail.value!)}
                placeholder="Ej: Almuerzo"
                style={{ marginTop: '20px' }}
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={!monto || !categoria}
              style={{ marginTop: '20px' }}
            >
              Guardar Gasto
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message="Gasto guardado correctamente"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default AgregarGasto;