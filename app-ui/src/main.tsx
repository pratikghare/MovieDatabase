import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { store } from './store/store';
import { routes } from './router/router';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="app-dark">
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  // </StrictMode>,
)
