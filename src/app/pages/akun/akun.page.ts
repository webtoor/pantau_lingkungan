import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html',
  styleUrls: ['./akun.page.scss'],
})
export class AkunPage implements OnInit {
userAuth
  constructor(public router: Router, public authService : AuthService, private navCtrl: NavController){
     const data = JSON.parse(localStorage.getItem('userAuth'));
     this.userAuth = data;
   }

  ngOnInit() {
  }

  logout(){
    //Api Token Logout
    this.authService.getData("logout", this.userAuth['access_token']).subscribe((res) =>{
     console.log(res) 
     if(res['success'] == '1'){
       localStorage.clear();
       this.navCtrl.navigateRoot('/login');
      }
      else{
       console.log("No access");
      }  
        }, (err) => {
         //Connection failed message
   });
      localStorage.clear();
      this.navCtrl.navigateRoot('/login');
  }
  

}
