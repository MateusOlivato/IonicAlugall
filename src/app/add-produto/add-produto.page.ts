import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})

export class AddProdutoPage implements OnInit {

  categoria: string = "";
  nomeProduto: string = "";
  descricaoProduto: string = "";
  imagemProduto: string = "";
  precoProduto: string = "";
  confirmaEmail:string;
  datastorage:any;
  email:string;
  qtdProdutos:number;
  

  disabledButton;


  constructor(private router: Router,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private accsPrvds: AccessProviders,
              private storage:Storage             
    ) { }

    ngOnInit(){

    }

    ionViewDidEnter(){
      this.storage.get('storage01').then((res)=>{
        console.log(res);
        this.datastorage = res;
        this.email = this.datastorage.email_address;
        this.qtdProdutos = this.datastorage.qtdProdutos;
      })
    }

    async cadastraProduto(){
      if(this.categoria==""){
        this.presentToast('O campo "Categoria" não pode estar em branco!');
      }else if(this.nomeProduto==""){
        this.presentToast('O campo "Nome da oferta" não pode estar em branco!');
      }else if(this.descricaoProduto==""){
        this.presentToast('O campo "Descrição" não pode estar em branco!');
      }else if(this.imagemProduto==""){
        this.presentToast('Por favor, selecione uma imagem!');
      }else if(this.precoProduto==""){
        this.presentToast('O campo "Preço" não pode estar em branco!');
      }else if(this.confirmaEmail!=this.email){
        this.presentToast('O e-mail informado não corresponde como o do proprietário da conta!');
      }else{
        this.disabledButton=true;
        const loader = await this.loadingCtrl.create({
          message: 'Por favor, aguarde...',          
        });
        loader.present();

        return new Promise(resolve => {
          let body = {
            aksi: 'proses_register_produto',
            nomeProduto: this.nomeProduto,
            descricaoProduto: this.descricaoProduto,
            precoProduto: this.precoProduto,
            imagemProduto: this.imagemProduto,
            categoria: this.categoria
          }

          this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=> {
              if(res.success==true){
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);
                this.router.navigateByUrl('');
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
        duration: 2500,
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
              this.cadastraProduto();
            }
          }
        ]
      });
  
      await alert.present();
    }


}