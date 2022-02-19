import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { CommomService } from 'src/app/services/commom.service';
import { environment } from 'src/environments/environment';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { ScrollbarComponent } from 'src/@vex/components/scrollbar/scrollbar.component';
import { Estabelecimento } from 'src/app/_models/estabelecimento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/_constants/messagesSnackBar';

@Component({
	selector: 'vex-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})

export class CadastroComponent implements OnInit {
	estabelecimento = new Estabelecimento();
	form: FormGroup;

	inputType = 'password';
	visible = false;
	cadastrando: Boolean = false;

	icVisibility = icVisibility;
	icVisibilityOff = icVisibilityOff;
	@ViewChild(ScrollbarComponent, { static: true }) scrollbar: ScrollbarComponent;

	constructor(private router: Router,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private snackbar: MatSnackBar,
		private commomService: CommomService
	) { }

	ngOnInit() {

		this.form = this.fb.group({
			nome: ['', Validators.required],
			estabelecimento: ['', Validators.required],
			email: new FormControl(
				'', [Validators.required,
				Validators.email
			]
			),
			cpf_cnpj: ['', Validators.required],
			senha: new FormControl(
				'', [Validators.required]
			),
			confirmarSenha: ['', Validators.required],
			termosCondicoes: ['', Validators.requiredTrue],
			politicasPrivacidade: ['', Validators.requiredTrue]
		}, { validator: this.checkPasswords }); // chamada de função para validação de senha
	}
	checkPasswords(form: FormGroup) {
		const senha = form.get('senha').value;
		const confirmarSenha = form.get('confirmarSenha').value;

		return senha === confirmarSenha ? null : { notSame: true }
	}

	cadastrar(estabelecimento: Estabelecimento) {
		estabelecimento.cadastroCompleto = false;
		estabelecimento.planoID = undefined;
		estabelecimento.enderecoID = undefined;

		this.commomService.post(`/estabelecimento`, estabelecimento).subscribe(response => {
			this.snackbar.open(MessagesSnackBar.CADASTRO_SUCESSO, 'Fechar', { duration: 5000 }); //tempo de duração de mensagem 
			this.form.reset(); // limpeza de formulário após envio de dados 
			this.cadastrando = false;
		},
			(error) => {
				console.log(error.message);
				this.cadastrando = false;
				this.snackbar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 5000 });
			})
	}

	scrollToBottom() {
		this.scrollbar.scrollbarRef.getScrollElement().scrollTo({
			behavior: 'smooth',
			top: this.scrollbar.scrollbarRef.getContentElement().clientHeight
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
