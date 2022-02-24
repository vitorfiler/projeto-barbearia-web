import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger60ms } from "src/@vex/animations/stagger.animation";




@Component({
  selector: 'modal-adicionar-servicos',
  templateUrl: 'modal-adicionar-servicos.html',
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]

})


export class ModalAdicionarServico implements OnInit {
  form: FormGroup;
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  constructor(
    public dialogRef: MatDialogRef<ModalAdicionarServico>,
  ) { }
  adicionarServico() { }

  cancelar(): void {
    this.dialogRef.close();
  }
}
