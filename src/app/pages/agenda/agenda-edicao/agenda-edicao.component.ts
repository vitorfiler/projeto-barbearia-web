import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

@Component({
	selector: 'vex-agenda-edicao',
	templateUrl: './agenda-edicao.component.html',
	styleUrls: ['./agenda-edicao.component.scss']
})
export class AgendaEdicaoComponent implements OnInit {

	form = this.fb.group({
		title: null,
		start: null,
		end: null
	});

	constructor(private dialogRef: MatDialogRef<AgendaEdicaoComponent>,
		@Inject(MAT_DIALOG_DATA) public event: CalendarEvent<any>,
		private fb: FormBuilder) {
	}

	ngOnInit() {
		this.form.patchValue(this.event);
	}

	save() {
		this.dialogRef.close({
			...this.event,
			...this.form.value
		});
	}

}
