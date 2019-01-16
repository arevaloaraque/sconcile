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
  submitted = false;
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
    this.user_data = JSON.parse(localStorage.getItem('currentUser'))['user'];
    this.userDataForm.controls['first_name'].setValue(this.user_data['first_name']);
    this.userDataForm.controls['last_name'].setValue(this.user_data['last_name']);
    console.log(this.f.first_name.errors);
  }

  get f() { return this.userDataForm.controls;}

  updateUserData(){
    console.log(this.f.first_name.errors);
    this.submitted = true;
    if (this.userDataForm.invalid) {
      this.toastrService.error('Por favor completa todos los campos');
      return false;
    }
    let data = JSON.parse(localStorage.getItem('currentUser'));
    // data['user']['first_name'] = this.first_name;
    // data['user']['last_name'] = this.last_name;
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

}
