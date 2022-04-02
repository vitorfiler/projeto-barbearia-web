import { stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { CaixaService } from 'src/app/services/caixa.service';
import { Venda } from 'src/app/_models/venda';

@Component({
  selector: 'vex-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.scss'],
  animations: [stagger20ms, fadeInUp400ms]
})
export class NovaVendaComponent implements OnInit {

  venda = new Venda();
  form: FormGroup;
  radioButton: String = "serv";
  listProdServ: any[];

  constructor(
    private fb: FormBuilder,
    private caixaService: CaixaService
  ) { }
  
  ngOnInit(): void {

    this.form = this.fb.group({
			responsavel: ['', Validators.required],
      cliente: ['', Validators.required],
      radioButton: ['', Validators.required],
      pesquisaProdServ: ['', Validators.required],
		});

  }

  buscaProdutosServicos(varProduto:String, buscaNomeProdServ: String){
    varProduto=='prod'?this.buscaProdutos(buscaNomeProdServ):this.buscaServicos(buscaNomeProdServ);
  }
  buscaProdutos(buscaNomeProdServ:String){
    this.caixaService.buscarProdutos().subscribe(response=>{
      this.listProdServ=response.body;     
    });
  }
  buscaServicos(buscaNomeProdServ:String){
    this.caixaService.buscarServicos().subscribe(response=>{
      this.listProdServ=response.body;
    });
  }

}
