import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{


  datastorage: any;
  nome: string;
  email: string;
  genero: string;
  id: string;
  telefone:string;
  qtdProdutos:number;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage:Storage,
    public navCtrl: NavController,
    public accsPrvds: AccessProviders
    ) {}

    ngOnInit(){

    }

    ionViewWillEnter(){
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

    
    

}
