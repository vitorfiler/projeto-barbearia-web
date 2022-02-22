import { ServicosComponent } from './pages/servicos/servicos.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { LoginFinalComponent } from './pages/login-final/login-final.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { RecuperarSenhaSucessoComponent } from './pages/recuperar-senha/recuperar-senha-sucesso/recuperar-senha-sucesso.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { PainelComponent } from './pages/painel/painel.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';


const routes: VexRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      { path: 'agenda', component: AgendaComponent },
      { path: 'agendamentos', component: AgendamentosComponent },
      { path: 'servicos', component: ServicosComponent },
      { path: 'caixa', component: CaixaComponent },
      { path: 'comentarios', component: ComentariosComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'painel', component: PainelComponent }   
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
