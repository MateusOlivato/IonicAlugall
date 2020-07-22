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


  your_name: string = "";
  gender: string = "";
  date_birth: string = ""; 
  email_address: string = "";
  password: string = "";
  confirm_password: string = "";  

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
      if(this.your_name==""){
          this.presentToast('O campo "Nome" não pode estar em branco!');
      }else if(this.email_address==""){
        this.presentToast('O campo "E-mail" não pode estar em branco!');
      }else if(this.password==""){
        this.presentToast('O campo "Senha" não pode estar em branco!');
      }else if(this.confirm_password==""){
        this.presentToast('O campo "Confirmar senha" não pode estar em branco!');
      }else if(this.confirm_password!=this.password ){
        this.presentToast('As senhas não coincidem!');
      }else if(this.gender==""){
        this.presentToast('O campo "Gênero" não pode estar em branco!');
      }else if(this.date_birth=""){
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
            your_name: this.your_name,
            email_address: this.email_address,
            date_birth: this.date_birth,
            password: this.password,
            gender: this.gender
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
                console.log(err);
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
              console.log('Cancelado');
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
