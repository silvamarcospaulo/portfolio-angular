import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/paginas/home/home.component';
import { MeusLinksComponent } from './componentes/paginas/meus-links/meus-links.component';
import { PromocoesComponent } from './componentes/paginas/promocoes/promocoes.component';
import { PromocoesMercadoLivreComponent } from './componentes/paginas/promocoes/promocoes-mercado-livre/promocoes-mercado-livre.component';
import { PromocoesAmazonComponent } from './componentes/paginas/promocoes/promocoes-amazon/promocoes-amazon.component';
import { PromocoesKabumComponent } from './componentes/paginas/promocoes/promocoes-kabum/promocoes-kabum.component';
import { PromocoesAliexpressComponent } from './componentes/paginas/promocoes/promocoes-aliexpress/promocoes-aliexpress.component';
import { PromocoesShopeeComponent } from './componentes/paginas/promocoes/promocoes-shopee/promocoes-shopee.component';
import { PromocoesDetalhesComponent } from './componentes/paginas/promocoes/promocoes-detalhes/promocoes-detalhes.component';
import { LoginComponent } from './componentes/paginas/login/login.component';
import { PainelAdminComponent } from './componentes/paginas/login/painel-admin/painel-admin.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bio', component: MeusLinksComponent, title: '@marcospaulo.dev' },
    { path: 'login', component: LoginComponent, title: '@marcospaulo.dev - Admin' },
    { path: 'painel', component: PainelAdminComponent, canActivate: [authGuard], title: 'Painel Admin' },
    { path: 'promocoes', component: PromocoesComponent, title: '@marcospaulo.dev - Promoções' },
    { path: 'promocoes/:loja/:id', component: PromocoesDetalhesComponent, title: '@marcospaulo.dev - Promoções' },
    { path: 'promocoes/mercado-livre', component: PromocoesMercadoLivreComponent, title: '@marcospaulo.dev - Promoções Mercado Livre' },
    { path: 'promocoes/amazon', component: PromocoesAmazonComponent, title: '@marcospaulo.dev - Promoções Amazon' },
    { path: 'promocoes/kabum', component: PromocoesKabumComponent, title: '@marcospaulo.dev - Kabum' },
    { path: 'promocoes/shopee', component: PromocoesShopeeComponent, title: '@marcospaulo.dev - Shopee' },
    { path: 'promocoes/aliexpress', component: PromocoesAliexpressComponent, title: '@marcospaulo.dev - AliExpress' }
];