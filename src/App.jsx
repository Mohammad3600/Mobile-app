import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import "./theme/global.css"
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routes/Routers';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      {/* Your component tree */}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routers />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
