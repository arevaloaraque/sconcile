import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {

  user_data:any;
  userDataForm: FormGroup;
  userPasswordForm: FormGroup;
  submitted = false;
  submitted2 = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private apiservice: ServiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.userDataForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
    this.userPasswordForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password1: ['', Validators.required],
      new_password2: ['', Validators.required]
    });
    this.user_data = JSON.parse(localStorage.getItem('currentUser'))['user'];
    this.userDataForm.controls['first_name'].setValue(this.user_data['first_name']);
    this.userDataForm.controls['last_name'].setValue(this.user_data['last_name']);
  }

  get f() { return this.userDataForm.controls;}
  get f2() { return this.userPasswordForm.controls;}

  updateUserData(){
    this.submitted = true;
    if (this.userDataForm.invalid) {
      this.toastrService.error('Por favor completa todos los campos');
      return false;
    }
    let data = JSON.parse(localStorage.getItem('currentUser'));
    data['user']['first_name'] = this.f.first_name.value
    data['user']['last_name'] = this.f.last_name.value
    this.spinner.show();
    this.apiservice.updateUserData(data['user']).pipe(first())
      .subscribe(
        data => {
          this.toastrService.success('Información actualizada con exito.');
          this.spinner.hide();
          this.submitted = false;
        },
        error => {
          this.toastrService.error('Ocurrio un error, por favor contacto al administrador de sistema');
          this.spinner.hide();
          this.submitted = false;
        });
  }

  updateUserPassword(){
    this.submitted2 = true;
    if (this.userPasswordForm.invalid) {
      this.toastrService.error('Por favor completa todos los campos');
      return false;
    }
    
    let data = {
      'old_password': this.f2.old_password.value,
      'new_password1': this.f2.new_password1.value,
      'new_password2': this.f2.new_password2.value
    }

    if (data['new_password1'] != data['new_password2']) {
      this.f2.new_password2.setErrors({ 'incorrect': true });
      this.toastrService.error('Confirmación de contraseña incorrecta');
      return false;
    }

    this.spinner.show();
    this.apiservice.updateUserPassword(data).pipe(first())
      .subscribe(
        data => {
          if (data == true) {
            this.toastrService.success('Información actualizada con exito.');
            this.spinner.hide();
            this.submitted2 = false;
            this.userPasswordForm.reset();
          } else {
            this.toastrService.success(data['detail']);
          }
        },
        error => {
          this.toastrService.error('Ocurrio un error, por favor contacto al administrador de sistema');
          this.spinner.hide();
          this.submitted2 = false;
        });
  }
}
