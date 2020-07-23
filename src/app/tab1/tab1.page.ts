import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  datastorage: any;
  nome: string;
  email: string;
  genero: string;
  id: string;
  telefone:string;
  qtdProdutos:number;

  constructor(public alertController: AlertController, 
    public router: Router,            
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController) {}

    ionViewDidEnter(){
      this.storage.get('storage01').then((res)=>{
        console.log(res);
        this.datastorage = res;
        this.nome = this.datastorage.your_name;
        this.email = this.datastorage.email_address;
        this.genero = this.datastorage.gender;
        this.id = this.datastorage.id_user;
        this.telefone = this.datastorage.telefone;
        this.qtdProdutos = this.datastorage.qtdProdutos;
      })
    }

    ngOnInit(){

    }

    async presentToast(a){
      const toast = await this.toastCtrl.create({
        message: a,
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }

}
