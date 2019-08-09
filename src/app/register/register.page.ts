import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public router : Router) { }
  SignUp = { 
    "nama_depan" : "",
    "nama_belakang" : "",
    "noHp" : "",
    "email": "",
    "password": "",
    "password_confirmation" : ""
   };

  ngOnInit() {
  }

  submit(){
    this.router.navigate(['/home']);
  }

  login(){
    this.router.navigate(['/login']);
  }
}
