import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { GithubProvider } from 'contexts/Github';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

import 'styles/global.scss';

export function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <GithubProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </GithubProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
