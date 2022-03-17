import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoricoVendasService } from 'src/app/services/historico-vendas.service';
import { HistoricoVendas } from 'src/app/_models/historico-vendas';

@Component({
  selector: 'vex-historico-de-venda',
  templateUrl: './historico-de-venda.component.html',
  styleUrls: ['./historico-de-venda.component.scss']
})
export class HistoricoDeVendaComponent implements OnInit {

  estabelecimentoID = localStorage.getItem('estabelecimento_ID')
  carregando = false;
  periodo: string = '7';

  historicoVendas: HistoricoVendas	
  form: FormGroup
  
  constructor(
	  private snackbar: MatSnackBar,
	  private historicoVendaService: HistoricoVendasService,
	  private fb: FormBuilder,) { }

  ngOnInit(): void {
	this.inicializarFiltro()
  }

  filtrar(dt_inicial: string, dt_final: string) {
	this.carregando = true;
	this.historicoVendaService.filtrarMockon(this.estabelecimentoID, dt_inicial, dt_final).subscribe(resposta => {
		this.historicoVendas = resposta.body
		console.log(resposta)
		this.carregando = false;
	
	})
}

  validarFiltro(value) {

		this.periodo = value;
		let dt_inicial = this.form.get('dt_inicial').value
		let dt_final = this.form.get('dt_final').value

		if (dt_inicial && dt_final) {
			if (dt_inicial > dt_final) {
				this.snackbar.open("Insira uma data final maior que inicial", 'Ok', { duration: 4000 });
				return;
			}
			dt_inicial = (dt_inicial.getFullYear() + "-" + ((dt_inicial.getMonth() + 1)) + "-" + (dt_inicial.getDate()));
			dt_final = (dt_final.getFullYear() + "-" + ((dt_final.getMonth() + 1)) + "-" + (dt_final.getDate()));
			 this.filtrar(dt_inicial, dt_final);
			 console.log(value)
		}
		else {
			this.filtrar(dt_inicial, dt_final);
			console.log(value)
		}
	}

	inicializarFiltro() {
		this.form = this.fb.group({
			dt_inicial: [''],
			dt_final: [''],
		});
		
	}

}
