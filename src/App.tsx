import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, list, statsChart } from 'ionicons/icons';
import AgregarGasto from './pages/AgregarGasto';
import ListaGastos from './pages/ListaGastos';
import Estadisticas from './pages/Estadisticas';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/agregar">
            <AgregarGasto />
          </Route>
          <Route exact path="/lista">
            <ListaGastos />
          </Route>
          <Route path="/estadisticas">
            <Estadisticas />
          </Route>
          <Route exact path="/">
            <Redirect to="/agregar" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="agregar" href="/agregar">
            <IonIcon aria-hidden="true" icon={addCircle} />
            <IonLabel>Agregar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="lista" href="/lista">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>Gastos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="estadisticas" href="/estadisticas">
            <IonIcon aria-hidden="true" icon={statsChart} />
            <IonLabel>Resumen</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;