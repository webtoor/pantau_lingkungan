import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm : FormGroup;
  submitted = false;
  message:any;
  errors:any;

  constructor(public router : Router, private formBuilder: FormBuilder, 
    public toastController: ToastController,
    public authService: AuthService,  ) {
    this.registerForm = this.formBuilder.group({
      'namaDepan' : [null, Validators.required],
      'namaBelakang' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'noHp' : [null, Validators.required],
      'jenisKelamin' : [null, Validators.required],
      'alamat' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
   }


   get f() { return this.registerForm.controls; }

  ngOnInit() {
  }
  onFormSubmit() {
    this.submitted = true;
     // stop here if form is invalid
     if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value['password_confirmation'] = this.registerForm.value['password'];
    console.log(this.registerForm.value)
      this.authService.Register(this.registerForm.value, 'register')
      .subscribe(res => {
        console.log(res)
        if(res.status == 'berhasil') {
          this.presentToast('Berhasil membuat akun, silahkan login');
          this.router.navigate(['/login', {replaceUrl: true}]);
        }else{
          this.message = res['message'];
          this.errors = res['error'];
          var pes = "" ;
          for(var obj in this.errors) { 
            pes += this.errors[obj].toString() + "\n";
         }
         this.presentToast(pes.toString());
        }
      }, (err) => {
        console.log(err);
      });
  }

  login(){
    this.router.navigate(['/login']);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
