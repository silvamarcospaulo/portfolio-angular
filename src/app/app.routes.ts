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
import { AdminLayoutComponent } from './componentes/paginas/admin/admin-layout/admin-layout.component';
import { AdminProductsComponent } from './componentes/paginas/admin/admin-products/admin-products.component';
import { AdminCoursesComponent } from './componentes/paginas/admin/admin-courses/admin-courses.component';
import { AdminStudentsComponent } from './componentes/paginas/admin/admin-students/admin-students.component';
import { UniversityComponent } from './componentes/paginas/university/university.component';
import { CourseDetailComponent } from './componentes/paginas/university/course-detail/course-detail.component';
import { StudentDashboardComponent } from './componentes/paginas/university/student-dashboard/student-dashboard.component';
import { RegisterComponent } from './componentes/paginas/register/register.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'links-uteis', component: MeusLinksComponent, title: 'Links úteis' },
    { path: 'login', component: LoginComponent, title: '@marcospaulo.dev - Admin' },
    {
      path: 'painel',
      component: AdminLayoutComponent,
      canActivate: [authGuard],
      title: 'Painel Admin',
      children: [
        { path: 'produtos', component: AdminProductsComponent },
        { path: 'cursos', component: AdminCoursesComponent },
        { path: 'alunos', component: AdminStudentsComponent },
        { path: '', redirectTo: 'produtos', pathMatch: 'full' }
      ]
    },
    { path: 'promocoes', component: PromocoesComponent, title: '@marcospaulo.dev - Promoções' },
    { path: 'promocoes/:loja/:id', component: PromocoesDetalhesComponent, title: '@marcospaulo.dev - Promoções' },
    { path: 'promocoes/mercado-livre', component: PromocoesMercadoLivreComponent, title: '@marcospaulo.dev - Promoções Mercado Livre' },
    { path: 'promocoes/amazon', component: PromocoesAmazonComponent, title: '@marcospaulo.dev - Promoções Amazon' },
    { path: 'promocoes/kabum', component: PromocoesKabumComponent, title: '@marcospaulo.dev - Kabum' },
    { path: 'promocoes/shopee', component: PromocoesShopeeComponent, title: '@marcospaulo.dev - Shopee' },
    { path: 'promocoes/aliexpress', component: PromocoesAliexpressComponent, title: '@marcospaulo.dev - AliExpress' },
    { path: 'universidade', component: UniversityComponent, title: 'Universidade' },
    { path: 'universidade/cursos/:id', component: CourseDetailComponent, canActivate: [authGuard], title: 'Curso' },
    { path: 'universidade/dashboard', component: StudentDashboardComponent, canActivate: [authGuard], title: 'Meus Cursos' },
    { path: 'registro', component: RegisterComponent, title: 'Registre-se' }
];