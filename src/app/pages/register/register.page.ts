import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm : FormGroup;
  submitted = false;

  constructor(public router : Router, private formBuilder: FormBuilder,  ) {
    this.registerForm = this.formBuilder.group({
      'firstname' : [null, Validators.required],
      'lastname' : [null, Validators.required],
      'phone_number' : [null, Validators.required],
      'alamat' : [null, Validators.required],
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
    });
   }


   get f() { return this.registerForm.controls; }

  ngOnInit() {
  }
  onFormSubmit() {
    this.submitted = true;
  }
  submit(){
    this.router.navigate(['/home']);
  }

  login(){
    this.router.navigate(['/login']);
  }
}
