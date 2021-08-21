import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/_models/user';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { Observable } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';

@Component({
	selector: 'vex-login-final',
	templateUrl: './login-final.component.html',
	styleUrls: ['./login-final.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class LoginFinalComponent implements OnInit {


	form: FormGroup;
	arrowBack = arrowBack;
	inputType = 'password';
	visible = false;
	user = new User();
	nomeUrl = '';

	icVisibility = icVisibility;
	icVisibilityOff = icVisibilityOff;

	falhaLogin: boolean = false;
	consumo: any = [];
	logando: Boolean = false;

	constructor(private router: Router,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private snackbar: MatSnackBar,
		private loginService: LoginService,
	) { }

	
	ngOnInit(): void {
		this.form = this.fb.group({
			email: new FormControl(
				'',[Validators.required]),
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

	toggleVisibility() {
		if (this.visible) {
			this.inputType = 'password';
			this.visible = false;
			this.cd.markForCheck();
		} else {
			this.inputType = 'text';
			this.visible = true;
			this.cd.markForCheck();
		}
	}

}
