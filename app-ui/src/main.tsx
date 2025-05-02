import './styles/tailwind-config.css';
import './styles/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { RouterProvider } from 'react-router';
import router from './routes/routes.tsx';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <HeroUIProvider>
                <RouterProvider router={router} />
            </HeroUIProvider>
        </Provider>
    </StrictMode>,
);