import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { CommomService } from 'src/app/services/commom.service';
import { LoginService } from 'src/app/services/login.service';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'vex-recuperar-senha',
	templateUrl: './recuperar-senha.component.html',
	styleUrls: ['./recuperar-senha.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class RecuperarSenhaComponent implements OnInit {

	form: FormGroup;
	aguardando: Boolean = false;

	constructor(private router: Router,
		private fb: FormBuilder,
		private snackbar: MatSnackBar,
		private commomService: CommomService,
	) { }

	ngOnInit(): void {
		
		this.form = this.fb.group({
			email: new FormControl(
				'',[Validators.required, Validators.email]
			)
		});
	}
	recuperarSenha() {
		this.aguardando = true;
		let email = this.form.get('email').value
		return this.commomService.recuperarSenha(email).subscribe(response => {
			this.router.navigate(['/enviado']);
			this.aguardando = false;
		},
			(error) => {
				this.aguardando = false;
				console.log(error.message);
				this.snackbar.open(MessagesSnackBar.LOGIN_ERRO, 'Close', { duration: 9000 });
			});
	}
}
