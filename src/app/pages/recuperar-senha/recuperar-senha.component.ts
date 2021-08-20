import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { LoginService } from 'src/app/services/login.service';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { User } from 'src/app/_models/user';

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
	logando: Boolean = false;

	constructor(private router: Router,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private snackbar: MatSnackBar,
		private loginService: LoginService,
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			email: ["", [Validators.required]],
			password: ["", Validators.required],
		});
	}
	login() {
		this.logando = true;
		let username = this.form.get('email').value
		let password = this.form.get('password').value
		return this.loginService
			.login(username, password)
			.subscribe(response => {
				// console.log(response.body.nomeUsuario);
				// console.log(response.body.tipoUsuario);
				// console.log(response.body.token);
				// localStorage.setItem("typeUser", JSON.stringify(response.body.tipoUsuario))
				localStorage.setItem("currentUser", JSON.stringify(response.body.estabelecimento))
				localStorage.setItem("token", JSON.stringify(response.body.token))
				this.router.navigate(['/']);
				this.logando = false;
			},
				(error) => {
					this.logando = false;
					console.log(error.message);
					this.snackbar.open(MessagesSnackBar.LOGIN_ERRO, 'Close', { duration: 9000 });
				});
	}
}
