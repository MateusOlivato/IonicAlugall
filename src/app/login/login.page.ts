import { Component } from '@angular/core';
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

  email_address: string = "";
  password: string = "";
  
  disabledButton;

  constructor(public alertController: AlertController, 
              public router: Router,            
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private accsPrvds: AccessProviders,
              private storage: Storage,
              public navCtrl: NavController){};
  
  

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async tentaLogin(){
    if(this.email_address==""){
      this.presentToast('O campo "E-mail" não pode estar em branco!')
    }else if(this.password==""){
      this.presentToast('O campo "Senha" não pode estar em branco!')
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Por favor, aguarde...',
      });
      loader.present();    

    return new Promise(async resolve => {
      let body = {
        aksi: 'proses_login',
        email_address: this.email_address,
        password: this.password
      }

      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=> {
        if(res.success==true){
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Login efetuado com sucesso!');
          this.storage.set('storage01', res.result); //relacionado com o app.components.ts
          this.email_address = "";
          this.password = "";
          this.router.navigateByUrl('');
        }else if(res.success==false){
          this.disabledButton = false;
          loader.dismiss();
          this.presentToast('Usuário ou senha incorretos!');                
        }
      },(err)=>{
        loader.dismiss();
        this.disabledButton = false;
        this.presentToast('Usuário ou senha incorretos!');                
      });    
    });    
  }
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

