import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController,  Events, LoadingController, } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  submitted = false;
  loaderToShow: any;
  constructor(private formBuilder: FormBuilder,  
    public authService: AuthService,
    public router : Router, 
    public events : Events,
    public loadingController: LoadingController,
    public menuCtrl: MenuController,
    public toastController: ToastController) { 
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    if(localStorage.getItem('userAuth') ){
      this.router.navigate(['/home'], {replaceUrl: true});
    }
  }

  onFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    console.log(this.loginForm.value)
    this.showLoader()
      this.authService.Login( this.loginForm.value, 'login')
      .subscribe(res => {
        console.log(res)
        if(res.access_token) {
          this.hideLoader();
          this.events.publish('email', res['email']);
          localStorage.setItem('userAuth', JSON.stringify(res));
          this.router.navigate(['/home'], {replaceUrl: true});
        }else{
          this.hideLoader();
          this.presentToast();
        }
      }, (err) => {
        this.hideLoader();
        console.log(err);
      });

}

  
  get f() { return this.loginForm.controls; }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Anda memasukkan Email dan Password yang salah. Isi dengan data yang benar dan coba lagi',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  register(){
    this.router.navigate(['/register']);
  }

  async showLoader() {
    this.loaderToShow = await this.loadingController.create({
      message: 'Processing Server Request'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    /* this.hideLoader(); */
  }

  hideLoader() {
    this.loadingController.dismiss();

    /* setTimeout(() => {
      this.loadingController.dismiss();
    }, 1500);   */
  }
}
