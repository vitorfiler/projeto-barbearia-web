import { SolicitacaoService } from './../../services/solicitacao.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.scss']
})
export class SolicitacoesComponent implements OnInit {

  form: FormGroup;
  constructor(private router: Router,
		private fb: FormBuilder,
    private solicitacaoService : SolicitacaoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
			filtro: ['', Validators.required],
		});
  }

  filtrar(){
    let filtro = this.form.get('filtro').value
    let estabelecimentoID = '1'
    this.solicitacaoService.filtrar(estabelecimentoID,filtro).subscribe(resposta => {
      console.log(resposta)
    })
  }

}
