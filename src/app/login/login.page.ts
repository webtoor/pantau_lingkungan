import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  SignIn = { "email": "", "password": "" };

  constructor(public router : Router, public menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  submit(){
    this.router.navigate(['/home']);

  }

  register(){
    this.router.navigate(['/register']);
  }
}
