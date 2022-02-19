import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { IconModule } from '@visurel/iconify-angular';
import { NgxMaskModule } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { GaugeModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGaugeModule } from 'ngx-gauge';
import { LoginFinalComponent } from './pages/login-final/login-final.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule } from './pages/login-final/calendar/calendar.module';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { RecuperarSenhaSucessoComponent } from './pages/recuperar-senha/recuperar-senha-sucesso/recuperar-senha-sucesso.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalDeletarSolicitacaoComponent, ModalSelectStatusSolicitacaoComponent, SolicitacoesComponent, SolicitacoesModal } from './pages/solicitacoes/solicitacoes.component';
import { SolicitacoesReservasComponent } from './pages/solicitacoes-reservas/solicitacoes-reservas.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { CoreModule } from './core.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ListagemServicosComponent } from './pages/servicos/listagem-servicos/listagem-servicos.component';
import { ListagemProdutosComponent } from './pages/servicos/listagem-produtos/listagem-produtos.component';
import { ListagemPromocoesComponent } from './pages/servicos/listagem-promocoes/listagem-promocoes.component';
import { CadastroEstabelecimentoModal } from './pages/modais/cadastro-estabelecimento/cadastro-estabelecimento-modal.component';
import { PlanosModalComponent } from './pages/modais/planos/planos-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFinalComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
    RedefinirSenhaComponent,
    RecuperarSenhaSucessoComponent,
    SolicitacoesComponent,
    SolicitacoesReservasComponent,
    ReservasComponent,
    SolicitacoesModal,
    ModalSelectStatusSolicitacaoComponent,
    ModalDeletarSolicitacaoComponent,
    CadastroEstabelecimentoModal,
    PlanosModalComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CalendarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxLoadingModule.forRoot({}),
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatIconModule,
    GaugeModule,
    NgxGaugeModule,
   
    MatCardModule,
    NgxChartsModule,
    MatSnackBarModule,
    ScrollingModule,
    ScrollbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTableModule,
    NgxMaskModule.forRoot(),
    MatCheckboxModule,
    MatInputModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    
    CoreModule,
    // Vex
    VexModule,
    CustomLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
