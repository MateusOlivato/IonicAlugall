import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  public formLogin: FormGroup;

  

  public mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail inválido' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório digitar a senha' },
      { tipo: 'minlenght', mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlenght', mensagem: 'A senha deve ter no máximo 10 caracteres.' }
    ],
    confirma: [],

  };

  constructor(public formBuilder: FormBuilder) {this.formLogin = formBuilder.group({

      //Aqui, declara-se todos os campos do formulário
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]

    });
  }

  public login(){

  }

}

