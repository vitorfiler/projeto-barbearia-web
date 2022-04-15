import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { LoginComponent } from './pages/login/login.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollbarModule } from 'src/@vex/components/scrollbar/scrollbar.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { RecuperarSenhaSucessoComponent } from './pages/recuperar-senha/recuperar-senha-sucesso/recuperar-senha-sucesso.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from './core.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ListagemServicosComponent } from './pages/servicos/exibicao-servicos/listagem-servicos/listagem-servicos.component';
import { ExibicaoProdutosComponent } from './pages/servicos/exibicao-produtos/exibicao-produtos.component';
import { CadastroEstabelecimentoModal } from './pages/modais/cadastro-estabelecimento/cadastro-estabelecimento-modal.component';
import { PlanosModalComponent } from './pages/modais/planos/planos-modal.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { PainelComponent } from './pages/painel/painel.component';
import { FluxoDeCaixa } from './pages/fluxo-de-caixa/fluxo-de-caixa.component';
import { ModalDeletarAgendamento } from './pages/modais/agendamento-modais/modal-deletar-agendamento/modal-deletar-agendamento';
import { ModalAlterarStatusAgendamento } from './pages/modais/agendamento-modais/modal-alterar-status/modal-alterar-status-agendamento';
import { ModalCadastrarEditarAgendamento } from './pages/modais/agendamento-modais/modal-cadastrar-editar/modal-cadastrar-editar-agendamento';
import { ListagemAgendamentosComponent } from './pages/agendamentos/listagem-agendamentos/listagem-agendamentos.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { CaixaComponent } from './pages/fluxo-de-caixa/caixa/caixa.component';
import { NovaVendaComponent } from './pages/fluxo-de-caixa/nova-venda/nova-venda.component';
import { HistoricoDeVendaComponent } from './pages/fluxo-de-caixa/historico-de-venda/historico-de-venda.component';
import { ListagemReservasComponent } from './pages/agendamentos/listagem-reservas/listagem-reservas.component';
import { ConstrucaoComponent } from './pages/construcao/construcao.component';
import { ConstrucaoModal } from './pages/modais/construcao-modal/modal-adicionar-servicos';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ValueTimePipe } from './value-time.pipe';
import { ModalDeletarServico } from './pages/modais/servico-modais/modal-deletar-servico/modal-deletar-servico';
import ModalOcultarServico from './pages/modais/servico-modais/modal-ocultar-servicos/modal-ocultar-servico';
import ModalServicoPromocional from './pages/modais/servico-modais/modal-servico-promocional/modal-servico-promocional';
import { ProdutosConstrucaoModal } from './pages/modais/produtos-modal/modal-produtos';
import { ModalCadastrarEditarServico } from './pages/modais/servico-modais/modal-cadastrar-editar-servico/modal-cadastrar-editar-servico';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GraficoDeBarrasHorizontaisComponent } from './pages/painel/grafico-de-barras-horizontais/grafico-de-barras-horizontais.component';
import { GraficoDeBarrasVerticaisComponent } from './pages/painel/grafico-de-barras-verticais/grafico-de-barras-verticais.component';
import { GraficoDeBarrasVerticalAgrupadasComponent } from './pages/painel/grafico-de-barras-vertical-agrupadas/grafico-de-barras-vertical-agrupadas.component';
import { GraficoDeLinhasComponent } from './pages/painel/grafico-de-linhas/grafico-de-linhas.component';
import { GraficoPizzaComponent } from './pages/painel/grafico-pizza/grafico-pizza.component';
import { AgendaModule } from './pages/agenda/agenda.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import ModalOcultarProduto from './pages/modais/produtos-modal/modal-ocultar-produtos/modal-ocultar-produtos';
import ModalPromocaoProdutos from './pages/modais/produtos-modal/modal-promocao-produtos/modal-promocao-produto';
import { ModalDeletarProduto } from './pages/modais/produtos-modal/modal-deletar-produtos/modal-deletar-produto';
import { ModalAdicionarProduto } from './pages/modais/produtos-modal/modal-adicionar-editar-produto/modal-adicionar-editar-produto';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModalFechamentoCaixa } from './pages/modais/fechamento-de-caixa-modal/fechamento-caixa.component';
import { GradeServicosComponent } from './pages/servicos/exibicao-servicos/grade-servicos/grade-servicos.component';
import { ExibicaoServicosComponent } from './pages/servicos/exibicao-servicos/exibicao-servicos.component';
import { CardComponent } from './_utils/card/card.component';
import { ListaProdutosComponent } from './pages/servicos/exibicao-produtos/lista-produtos/lista-produtos.component';
import { GradeProdutosComponent } from './pages/servicos/exibicao-produtos/grade-produtos/grade-produtos.component';
import { DadosAusentesComponent } from './_utils/dados-ausentes/dados-ausentes.component';
import { ExibicaoPromocoesComponent } from './pages/servicos/exibicao-promocoes/exibicao-promocoes.component';
import { GradePromocoesComponent } from './pages/servicos/exibicao-promocoes/grade-promocoes/grade-promocoes.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		CadastroComponent,
		RecuperarSenhaComponent,
		RedefinirSenhaComponent,
		RecuperarSenhaSucessoComponent,
		ListagemAgendamentosComponent,
		AgendamentosComponent,
		ModalCadastrarEditarAgendamento,
		ModalAlterarStatusAgendamento,
		ModalDeletarAgendamento,
		ServicosComponent,
		ListagemServicosComponent,
		ExibicaoProdutosComponent,
		CadastroEstabelecimentoModal,
		PlanosModalComponent,
		CadastroEstabelecimentoModal,
		FluxoDeCaixa,
		ComentariosComponent,
		ConfiguracoesComponent,
		PainelComponent,
		CaixaComponent,
		NovaVendaComponent,
		HistoricoDeVendaComponent,
		ListagemReservasComponent,
		ConstrucaoComponent,
		ConstrucaoModal,
		ValueTimePipe,
		ModalOcultarServico,
		ModalServicoPromocional,
		ModalDeletarServico,
		ProdutosConstrucaoModal,
		ModalCadastrarEditarServico,
		GraficoDeBarrasHorizontaisComponent,
		GraficoDeBarrasVerticaisComponent,
		GraficoDeBarrasVerticalAgrupadasComponent,
		GraficoDeLinhasComponent,
		GraficoPizzaComponent,
		ModalFechamentoCaixa,
		ModalOcultarProduto,
		ModalPromocaoProdutos,
		ModalDeletarProduto,
		ModalAdicionarProduto,
		GradeServicosComponent,
		ExibicaoServicosComponent,
		CardComponent,
		ListaProdutosComponent,
		GradeProdutosComponent,
		DadosAusentesComponent,
		ExibicaoPromocoesComponent,
		GradePromocoesComponent

	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
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
		MatSlideToggleModule,
		MatTooltipModule,
		AgendaModule,
		MatButtonToggleModule,
		MatListModule,
		MatExpansionModule,

		// Vex
		VexModule,
		CustomLayoutModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
		MatDatepickerModule,
		MatNativeDateModule,
		[{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
		[{ provide: LOCALE_ID, useValue: 'pt' }]

	],
	bootstrap: [AppComponent],
})
export class AppModule { }
