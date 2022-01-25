import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';

import { LoginFinalComponent } from './pages/login-final/login-final.component';
import { CalendarComponent } from './pages/login-final/calendar/calendar.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { RecuperarSenhaSucessoComponent } from './pages/recuperar-senha/recuperar-senha-sucesso/recuperar-senha-sucesso.component';
import { SolicitacoesReservasComponent } from './pages/solicitacoes-reservas/solicitacoes-reservas.component';


const routes: VexRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      { path: 'agenda', component: CalendarComponent },
      { path: 'solicitacoes', component: SolicitacoesReservasComponent },
      { path: 'reservas', component: SolicitacoesReservasComponent }
      
    ],
  },
  { path: 'login', component: LoginFinalComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'enviado', component: RecuperarSenhaSucessoComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
