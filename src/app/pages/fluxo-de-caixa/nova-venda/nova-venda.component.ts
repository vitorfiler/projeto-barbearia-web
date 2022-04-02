import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Venda } from 'src/app/_models/venda';

@Component({
  selector: 'vex-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.scss']
})
export class NovaVendaComponent implements OnInit {

  venda = new Venda();
  form: FormGroup;
  radioButton: String;

  constructor(
    private fb: FormBuilder,
  ) { }
  
  ngOnInit(): void {

    this.form = this.fb.group({
			responsavel: ['', Validators.required],
      cliente: ['', Validators.required],
      radioButton: ['', Validators.required],
      pesquisaProdServ: ['', Validators.required],
		});

  }

  buscaProdutosServicos(varProduto:String){
    console.log(varProduto);
    
    let buscaNomeProdServ = this.form.get('pesquisaProdServ').value;
    varProduto=='prod'?this.buscaProdutos(buscaNomeProdServ):this.buscaServicos(buscaNomeProdServ);
  }
  buscaProdutos(buscaNomeProdServ:String){
    console.log(buscaNomeProdServ);
  }
  buscaServicos(buscaNomeProdServ:String){
    console.log(buscaNomeProdServ);
  }

}
