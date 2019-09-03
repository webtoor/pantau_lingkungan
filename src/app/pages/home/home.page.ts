import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MenuController, Platform, LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  laporanForm : FormGroup;
  submitted = false;
  capturedSnapURL = ''
  latitude
  longitude
  accuracy
  altitude
  userAuth
  image
  constructor(
    public authService: AuthService,
    public toastController: ToastController,
    public alertController: AlertController, public loadingController: LoadingController, public platform : Platform,
    public camera: Camera, 
    private navCtrl: NavController,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private formBuilder: FormBuilder, public router : Router, public menuCtrl: MenuController, ) {
    this.laporanForm = this.formBuilder.group({
      'judul' : [null, Validators.required],
      'kategori' : [null, Validators.required],
      'deskripsiLaporan' : [null, Validators.required],
      'namaPerusahaan' : [null],
      'desaKelurahan' : [null],
      'kecamatan' : [null],
      'kotaKabupaten' : [null],
      'provinsi' : [null],
      'latitude' : [null, Validators.required],
      'longitude' : [null, Validators.required],
      'altitude' : [null],
      'accuracy' : [null, Validators.required],
      'img' : [null],
    });
    const data = JSON.parse(localStorage.getItem('userAuth'));
    this.userAuth = data;
  }


  ngOnInit() {
    this.menuCtrl.enable(true);
  }
  ionViewWillEnter() {
    this.laporanForm.reset();
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  pantauSampah(){
    this.router.navigate(['/pantau-sampah']);
  }

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
              this.presentToast('Untuk mendapatkan akurasi yang maksimal, Anda perlu mengaktifkan GPS')
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
        this.presentToast('Untuk mendapatkan akurasi yang maksimal, Anda perlu mengaktifkan GPS')
      );
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
        this.laporanForm.patchValue({
          latitude : resp.coords.latitude,
          longitude : resp.coords.latitude,
          altitude : resp.coords.altitude,
          accuracy : resp.coords.accuracy
        });

        if(!altitudes){
          this.altitude = 'Data tidak tersedia';
        }else{
          this.altitude = altitudes;
  
        }
        loading.dismiss();
       }).catch((error) => {
        loading.dismiss();
        this.presentToast('Error getting location' + error);
         console.log('Error getting location', error);
       });
  
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
            this.router.navigate(['/loader', {replaceUrl: true}]);

          }
        }
      ]
    });

    await alert.present();
  }
  takeSnap(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
      let base64Image = "data:image/jpeg;base64," + imageData;
      this.image = base64Image;
      this.laporanForm.patchValue({
        img : this.image,
      });      
      this.capturedSnapURL = base64Image;
      /* this.capturedSnapURL =(<any>window).Ionic.WebView.convertFileSrc(imageData); */
    }, (err) => {
     // Handle error
     this.presentToast("error "+JSON.stringify(err))
    });

  }

  get f() { return this.laporanForm.controls; }

  async onFormSubmit() {
    this.submitted = true;
  
    this.laporanForm.value['user_id'] = this.userAuth['id']
    console.log(this.laporanForm.value)

    if (this.laporanForm.invalid) {
      this.presentToast('Data yang anda masukan belum lengkap')
      return
     }
     if(this.laporanForm.value['img'] == null){
       this.presentToast('Anda belum mengambil foto!')
       return
     }
     const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Anda yakin dengan isi data diatas?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
          }
        },
       {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
          
            this.authService.PostData(this.laporanForm.value, 'api/v1/user/lapor', this.userAuth['access_token']).subscribe(res => {
              console.log(res)
              if(res.status == 401){
                localStorage.clear();
                this.presentToast('Akses Token Invalid')
                this.router.navigate(['/login', {replaceUrl: true}]);
              }else if(res.status == '1'){
                console.log(res.message);
                this.navCtrl.navigateRoot('/loader');
              }else{
                this.presentToast('Maaf. Terjadi kesalahan, Coba beberapa saat lagi :(')
              }
            }, (err) => {
              this.presentToast('Maaf. Terjadi kesalahan, Coba beberapa saat lagi :(')
              console.log(err);
            });
          }
        }
      ]
    });
    await alert.present();
    
  }

}
