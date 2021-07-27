import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { CommomService } from 'src/app/services/commom.service';
import { environment } from 'src/environments/environment';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { ScrollbarComponent } from 'src/@vex/components/scrollbar/scrollbar.component';

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


  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  @ViewChild(ScrollbarComponent, { static: true }) scrollbar: ScrollbarComponent;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private commomService: CommomService
  ) { }

  ngOnInit() {
    // this.form = this.fb.group({
    //   nome: ['', Validators.required],
    //   estabelecimento: ['', Validators.required],
    //   email: ['', Validators.required],
    //   cpf_cnpj: ['', Validators.required],
    //   senha: ['', Validators.required],
    //   ConfirmarSenha: ['', Validators.required],
    // });
    this.form = this.fb.group({
      nome: ['', ],
      estabelecimento: ['', ],
      email: ['', ],
      cpf_cnpj: ['', ],
      senha: ['', ],
      ConfirmarSenha: ['', ],
    });
  }

  cadastrar() {
    const body = this.montarBody();
    this.commomService.post(`${environment.cadastro}`, body).subscribe(response=>{
      console.log(response.body);
      
    })
  }

  montarBody(): any{
    let body = {
      "user_name": this.form.get('nome').value,
      "establishment_name": this.form.get('estabelecimento').value,
      "email": this.form.get('email').value,
      "CPF_CNPJ": this.form.get('cpf_cnpj').value,
      "password": this.form.get('senha').value
    }
    console.log(body);
    
    return body;
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
