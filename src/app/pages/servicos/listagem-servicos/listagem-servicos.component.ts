import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/_models/categoria';
import { ModalAdicionarServico } from '../../modais/servicoes-modais/modal-adicionar-servicos';

@Component({
  selector: 'vex-listagem-servicos',
  templateUrl: './listagem-servicos.component.html',
  styleUrls: ['./listagem-servicos.component.scss']
})
export class ListagemServicosComponent implements OnInit {
  form: FormGroup;
  selecaoCategoria: Categoria[] = [
    { value: 'TODOS', viewValue: 'Todos' },
    { value: 'CABELOF', viewValue: 'Cabelo Feminino' },
    { value: 'CABELOM', viewValue: 'Cabelo Masculino' },
    { value: 'UNHAEPELE', viewValue: 'Unha e pele' },
  ];
  constructor(private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) {

  }

  inicializarFiltro() {
    this.form = this.fb.group({
      categoria: [this.selecaoCategoria[0].value]
    });
  }

  ngOnInit(): void {
    this.inicializarFiltro();
  }

  abrirModalAdicionarServico(isAdicionar: boolean) {
    let dialogRef;

    if (isAdicionar) {
      dialogRef = this.dialog.open(ModalAdicionarServico)
    }
  }
}
