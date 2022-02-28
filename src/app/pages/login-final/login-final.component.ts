import { CadastroEstabelecimentoModal } from './../modais/cadastro-estabelecimento/cadastro-estabelecimento-modal.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/_models/user';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import { MatDialog } from '@angular/material/dialog';
import { PlanosModalComponent } from '../modais/planos/planos-modal.component';

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
		public dialog: MatDialog
	) { }


	ngOnInit(): void {
		this.form = this.fb.group({
			email: new FormControl(
				'', [Validators.required]),
			password: ["", Validators.required],
		});

	}
	//metodo para exibir o modal na tela de agendamentos, assim que fizer o login esse modal sera apresentado
	MostrarModalCadastroCompleto() {
		let cadastroCompleto = JSON.parse(localStorage.getItem('cadastroCompleto'))
		if (!cadastroCompleto) {
			const dialogRef = this.dialog.open(CadastroEstabelecimentoModal);
			dialogRef.afterClosed().subscribe(result => {
				this.abrirModalPlanos();
			});
		}
	}
	// Metodo para abrir modal de planos
	abrirModalPlanos() {
		const dialogRef = this.dialog.open(PlanosModalComponent, {
			width: '1000px', 
			height: 'auto', 
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	login() {
		this.logando = true;
		let username = this.form.get('email').value
		let password = this.form.get('password').value
		return this.loginService
			.login(username, password)
			.subscribe(response => {
				localStorage.setItem("currentUser", JSON.stringify(response.body.estabelecimento))
				localStorage.setItem("token", response.body.token)
				localStorage.setItem("estabelecimento_ID", response.body.estabelecimento_ID)
				localStorage.setItem("cadastroCompleto", response.body.cadastroCompleto)
				this.router.navigate(['/']);
				this.MostrarModalCadastroCompleto()
				this.logando = false;
				if (!response.body.planoID && response.body.cadastroCompleto) {
					this.abrirModalPlanos();
				}
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
