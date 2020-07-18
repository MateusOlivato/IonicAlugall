import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {


  nome: string = "";
  email: string = "";
  senha: string = "";
  confirmarSenha: string = "";
  genero: string = "";
  dataNascimento: string = "";

  disabledButton;


  constructor(private router: Router,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private accsPrvds: AccessProviders             
    ) { }

  ngOnInit() {
  }

    ionViewDidEnter(){
      this.disabledButton = false;
    }

    async tryRegister(){
      if(this.nome==""){
          this.presentToast('O campo "Nome" não pode estar em branco!');
      }else if(this.email==""){
        this.presentToast('O campo "E-mail" não pode estar em branco!');
      }else if(this.senha==""){
        this.presentToast('O campo "Senha" não pode estar em branco!');
      }else if(this.confirmarSenha==""){
        this.presentToast('O campo "Confirmar senha" não pode estar em branco!');
      }else if(this.confirmarSenha!=this.senha ){
        this.presentToast('As senhas não coincidem!');
      }else if(this.genero==""){
        this.presentToast('O campo "Gênero" não pode estar em branco!');
      }else if(this.dataNascimento==""){
        this.presentToast('O campo "Data de nascimento" não pode estar em branco!');
      }else{
        this.disabledButton=true;
        const loader = await this.loadingCtrl.create({
          message: 'Por favor, aguarde...',          
        });
        loader.present();

        return new Promise(resolve => {
          let body = {
            aksi: 'proses_register',
            Nome: this.nome,
            Email: this.email,
            Nascimento: this.dataNascimento,
            Senha: this.senha,
            ConfirmarSenha: this.confirmarSenha,
            Genero: this.genero
          }

          this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=> {
              if(res.success==true){
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);
                this.router.navigate(['/login'])
              }else{
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);                
              }

          },(err)=>{
                loader.dismiss();
                this.disabledButton = false;
                this.presentAlert('Tempo de requisição esgotado!');  
          });
        });
      }
    }

    async presentToast(a){
      const toast = await this.toastCtrl.create({
        message: a,
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }

    async presentAlert(a) {
      const alert = await this.alertCtrl.create({
        header: a,
        backdropDismiss: false,       
        buttons: [
          {
            text: 'Close',            
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Tentar novamente',
            handler: () => {
              this.tryRegister();
            }
          }
        ]
      });
  
      await alert.present();
    }


}
