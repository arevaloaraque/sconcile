import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import {ServiceService} from '../../service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiservice:ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required,Validators.minLength(5)]]
    });

    // reset login status
    this.apiservice.logout();
  }

  get f() { return this.loginForm.controls; }

  loginMe(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();

    this.apiservice.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastrService.success('Bienvenido');
          this.spinner.hide();
          this.router.navigate(['/home']);
        },
        error => {
            this.toastrService.error('Ocurrio un error, por favor contacto al administrador de sistema');
            this.spinner.hide();
        });
    }
}

