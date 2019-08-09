import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
@Component({
  selector: 'app-pantau-sampah-plastik',
  templateUrl: './pantau-sampah-plastik.page.html',
  styleUrls: ['./pantau-sampah-plastik.page.scss'],
})
export class PantauSampahPlastikPage implements OnInit {
  capturedSnapURL = ''
  latitude
  longitude
  accuracy
  altitude
  constructor(public router : Router, public alertController: AlertController, public loadingController: LoadingController, public platform : Platform, public camera: Camera, private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy) { }

  ngOnInit() {
  }

 //Check if application having GPS access permission  
 checkGPSPermission() {
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
    result => {
      if (result.hasPermission) {

        //If having permission show 'Turn On GPS' dialogue
        this.askToTurnOnGPS();
      } else {

        //If not having permission ask for permission
        this.requestGPSPermission();
      }
    },
    err => {
      alert(err);
    }
  );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        this.askToTurnOnGPS();
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              /* alert('requestPermission Error requesting location permissions ' + error) */
              alert('Untuk mendapatkan akurasi yang tinggi, Anda perlu mengaktifkan GPS')
            }
          );
      }
    });
  }
 
  askToTurnOnGPS() {
    
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => 
      /* alert('Error requesting location permissions ' + JSON.stringify(error)) */
      alert('Untuk mendapatkan akurasi yang tinggi, Anda perlu mengaktifkan GPS')
    );
  }
  async submit() {
    const alert = await this.alertController.create({
      header: 'Terima kasih',
      message: 'Telah melaporkan hal ini',
      buttons: [
       {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/home']);

          }
        }
      ]
    });

    await alert.present();
  }

  takeSnap(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.capturedSnapURL =(<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
     // Handle error
     alert("error "+JSON.stringify(err))
    });

  }

  async getLocationCoordinates(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
    });
    await loading.present();
    let options = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true  };
  
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log(resp)
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;
      var altitudes = resp.coords.altitude;
      if(!altitudes){
        this.altitude = 'Data tidak tersedia';
      }else{
        this.altitude = altitudes;

      }
      /* this.accuracy = resp.coords.accuracy;   */ 
      loading.dismiss();
     }).catch((error) => {
      loading.dismiss();
       alert('Error getting location' + error);
       console.log('Error getting location', error);
     });

}
 
}
