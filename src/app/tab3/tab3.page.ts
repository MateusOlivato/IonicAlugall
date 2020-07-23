import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {



  constructor(private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage:Storage,
    public navCtrl: NavController
    ) {}

async logoff(){
  this.storage.set('storage01', null);
  this.router.navigate(['/login'])
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
