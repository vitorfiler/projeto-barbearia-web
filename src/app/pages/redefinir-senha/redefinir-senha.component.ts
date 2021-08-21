import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { CommomService } from 'src/app/services/commom.service';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { MyErrorStateMatcher } from 'src/app/_config/my-error-state-matcher';

@Component({
  selector: 'vex-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss'],
  animations: [
	  fadeInUp400ms,
	  stagger20ms
  ]
})
export class RedefinirSenhaComponent implements OnInit {

	form: FormGroup;
	logando: Boolean = false;
	visible = false;
	inputType = 'password';
	matcher = new MyErrorStateMatcher();
	icVisibility = icVisibility;
	icVisibilityOff = icVisibilityOff;

	constructor(private router: Router,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private snackbar: MatSnackBar,
		private commomService: CommomService,
	) { }

	ngOnInit() {
		this.form = this.fb.group({
			senha: ["", Validators.required],
			confirmarSenha: ["", Validators.required]
		}, {validator: this.checkPasswords });
	}
	checkPasswords(group: FormGroup) { 
	  let senha = group.get('senha').value;
	  let confirmaSenha = group.get('confirmarSenha').value;
  
	  return senha === confirmaSenha ? null : { notSame: true }     
	}

	validarHash(){
		
	}

	redefinirSenha() {
		// this.logando = true;
		let email = this.form.get('email').value
		return this.commomService.recuperarSenha(email).subscribe(response => {
			// this.router.navigate(['/']);
			// this.logando = false;
		},
			(error) => {
				// this.logando = false;
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

