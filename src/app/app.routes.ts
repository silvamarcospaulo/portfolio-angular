import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/paginas/home/home.component';
import { MeusLinksComponent } from './componentes/paginas/meus-links/meus-links.component';
import { CarrosselComponent } from './componentes/reutilizaveis/carrossel/carrossel.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'links-uteis', component: MeusLinksComponent },
    { path: 'mac', component: CarrosselComponent }
];