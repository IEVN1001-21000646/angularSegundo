import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren:()=> import('./auth/features/auth.routes')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formulario/ejemplo1/formulario.routes')
    },

    {
        path:'resistencia',
        loadChildren:()=> import('./formulario/resistencias/resistencias.routes')
    }
];