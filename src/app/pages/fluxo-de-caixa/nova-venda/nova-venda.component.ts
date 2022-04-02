import { DetalhePagamentoService } from './../../../services/detalhe-pagamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaixaService } from 'src/app/services/caixa.service';
import { Venda } from 'src/app/_models/venda';
import { MatTableDataSource } from '@angular/material/table';
import { CaixaService } from 'src/app/services/caixa.service';
import { FormControl, Validators } from '@angular/forms';

export class DetalhePagamento{
  produtoServico: string
  quantidade: number
  valor: number  
}

interface Quantidade{
  value: number;
}

interface Pagamento{
  value: string
}

interface Parcelamento{
  value: string
}

@Component({
  selector: 'vex-nova-venda',
  templateUrl: './nova-venda.component.html',
  styleUrls: ['./nova-venda.component.scss']
})
export class NovaVendaComponent implements OnInit {

  venda = new Venda();
  form: FormGroup;
  radioButton: String = "serv";
  listProdServ: any[];
  qtd: Quantidade[] = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
    {value: 6},
  ];

  pgto: Pagamento[] = [
    {value: 'Dinheiro'},
    {value: 'Credito'},
    {value: 'Debito'},
    {value: 'PIX'}
  ];

  parcela: Parcelamento[] = [
    {value: 'a vista'},
    {value: '2 parcelas'},
    {value: '3 parcelas'},
    
  ];

  dados: DetalhePagamento[] = [];

  dataSource = new MatTableDataSource<DetalhePagamento>()
  displayedColumns: string[] = ['imagem','Produto/Servico', 'Quantidade', 'Valor'];

  selectFormControl = new FormControl('', Validators.required);

  constructor(
    private caixaService: CaixaService, 
    private fb: FormBuilder
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
    this.detalharPagamento()
  }

  detalharPagamento(){
    this.caixaService.detalharPagamento().subscribe(response => {
      console.log(response)
      this.dados = response.body
      this.dataSource = new MatTableDataSource<DetalhePagamento>(this.dados)
    })
  }

}
