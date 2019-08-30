import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  laporanForm : FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, public router : Router, public menuCtrl: MenuController, ) {
    this.laporanForm = this.formBuilder.group({
      'judul' : [null, Validators.required],
      'sektor' : ['', Validators.required],
      'namaPerusahaan' : [''],
      'desaKelurahan' : [''],
      'kecamatan' : [''],
      'kotaKabupaten' : [''],
      'provinsi' : [''],
      'deskripsiLaporan' : ['', Validators.required],
    });
  }


  ngOnInit() {
    this.menuCtrl.enable(true);
  }
  pantauSampah(){
    this.router.navigate(['/pantau-sampah']);
  }
  get f() { return this.laporanForm.controls; }

  onFormSubmit() {
    this.submitted = true;

    if (this.laporanForm.invalid) {
      return;
   }
    }

}
