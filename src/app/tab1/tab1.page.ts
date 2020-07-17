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

  constructor(public alertController: AlertController, 
    public router: Router,            
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController) {}

    ionViewDidEnter(){
      this.storage.get('storage_01').then((res) =>{
        console.log(res);
        this.datastorage = res;
        this.nome = this.datastorage.your_name;
      })
    }

    ngOnInit(){

    }

}
