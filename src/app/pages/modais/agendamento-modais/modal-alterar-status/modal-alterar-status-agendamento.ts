import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: 'modal-alterar-status-agendamento',
	templateUrl: 'modal-alterar-status-agendamento.html',
})
export class ModalAlterarStatusAgendamento implements OnInit {
	form: FormGroup;
	mostraFormulario: boolean = false;
	constructor(
		private fb: FormBuilder,
		@Optional() @Inject(MAT_DIALOG_DATA) public agendamento: any) { // abstrair objeto de outra classe


	}
	ngOnInit(): void {
		this.form = this.fb.group({
			responsavel: ['', Validators.required],
		});
		if (this.agendamento.status == 'PENDENTE' || this.agendamento.status == 'RECUSADO') {
			this.form = this.fb.group({
				responsavel: [''],
			});
			this.mostraFormulario = false;
		}
		else if (this.agendamento.status == 'ACEITO') {
			this.mostraFormulario = true;
		}
	}

}
