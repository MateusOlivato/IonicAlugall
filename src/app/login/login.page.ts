import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  email_adress: string = "";
  password: string = "";
  
  disabledButton;

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

  constructor(public formBuilder: FormBuilder, 
              public alertController: AlertController, 
              public router: Router,            
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private accsPrvds: AccessProviders,
              private storage: Storage,
              public navCtrl: NavController) {this.formLogin = formBuilder.group({

      //Aqui, declara-se todos os campos do formulário
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]

    });
  }
  

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async tentaLogin(){

    return new Promise(async resolve => {
      let body = {
        aksi: 'proses_login',
        email_adress: this.email_adress,
        password: this.password
      }

      const loader = await this.loadingCtrl.create({
        message: 'Por favor, aguarde...',   
      });

      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=> {
        if(res.success==true){
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Login efetuado com sucesso!');
          this.storage.set('storage_01', res.result); //relacionado com o app.components.ts
          this.router.navigate(['/tabs'])
        }else{
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Falha em efetuar o login, verifique as credenciais!');                
        }
      },(err)=>{
        loader.dismiss();
        this.disabledButton = false;
        this.presentToast('Tempo de requisição esgotado!');                
      }     

      );    
  });
}

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
    });
    toast.present();
  }

async alertFormInvalid() {
  const alert = await this.alertController.create({
    header: 'ERRO!',
    message: 'Formulário invalido, confira os dados!',
    buttons: ['OK']
  });

  await alert.present();
}

async alertUserInvalid() {
  const alert = await this.alertController.create({
    header: 'ERRO!',
    message: 'Email ou senha invalidos, confira os dados!',
    buttons: ['OK']
  });

  await alert.present();
}

abrirCadastrar(){
  this.router.navigate(['/cadastro'])
}


}

