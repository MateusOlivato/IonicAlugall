import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})

export class AddProdutoPage implements OnInit {

  NomeOf: string = "";
  Desc: string = "";
  Imagem: string = "";
  Preco: string = "";
  Categoria: string = "";

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
      if(this.NomeOf==""){
          this.presentToast('O campo do Nome não pode estar em branco!');
      }else if(this.Desc==""){
        this.presentToast('O campo da "Descrição" deve conter uma descrição');
      }else if(this.Imagem==""){
        this.presentToast('Deve ter uma imagem.');
      }else if(this.Preco==""){
        this.presentToast('O campo de "Preço" não pode estar em branco!');
      }else if(this.Categoria==""){
        this.presentToast('O campo "Categoria" não pode estar em branco!');
     
      }else{
        this.disabledButton=true;
        const loader = await this.loadingCtrl.create({
          message: 'Por favor, aguarde...',          
        });
        loader.present();

        return new Promise(resolve => {
          let body = {
            aksi: 'proses_register',
            NomeOf: this.NomeOf,
            Desc: this.Desc,
            Preco: this.Preco,
            Imagem: this.Imagem,
            Categoria: this.Categoria
          }

          this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=> {
              if(res.success==true){
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);
                this.router.navigate(['/pag-produto'])
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