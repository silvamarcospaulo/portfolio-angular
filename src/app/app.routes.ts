import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/paginas/home/home.component';
import { MeusLinksComponent } from './componentes/paginas/meus-links/meus-links.component';
import { PromocoesComponent } from './componentes/paginas/promocoes/promocoes.component';
import { PromocoesMercadoLivreComponent } from './componentes/paginas/promocoes/promocoes-mercado-livre.component';
import { PromocoesKabumComponent } from './componentes/paginas/promocoes/promocoes-kabum.component';
import { PromocoesAmazonComponent } from './componentes/paginas/promocoes/promocoes-amazon.component';
import { PromocoesAliExpressComponent } from './componentes/paginas/promocoes/promocoes-aliexpress.component';
import { PromocoesShopeeComponent } from './componentes/paginas/promocoes/promocoes-shopee.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'links-uteis', component: MeusLinksComponent },
    { path: 'promocoes', component: PromocoesComponent },
    { path: 'promocoes/mercado-livre', component: PromocoesMercadoLivreComponent },
    { path: 'promocoes/amazon', component: PromocoesAmazonComponent },
    { path: 'promocoes/kabum', component: PromocoesKabumComponent },
    { path: 'promocoes/shopee', component: PromocoesShopeeComponent },
    { path: 'promocoes/aliexpress', component: PromocoesAliExpressComponent },
];