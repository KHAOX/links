import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  serviceRef = 'auth';
  model: any = {};
  modelRegister: any = {};

  public form!: FormGroup;
  public formRegister!: FormGroup;

  showRegisterForm: boolean =  false;

  constructor(
    public App: AppComponent,
    private frmBuilder: FormBuilder,
    private frmBuilderRegister: FormBuilder,
    private Auth: AuthService,
    private Services: AppService,
    private toastr: ToastrService,
    private translate: TranslateService) {}

  ngOnInit(): void {
    this.form = this.frmBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formRegister = this.frmBuilderRegister.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {    
    this.Auth.login('/login', this.formRegister);
  }

  singup(){
    this.Services.post('register', this.model).subscribe(
      res => {
        if((<any>res).id == '1'){
          this.toastr.success(this.translate.instant('app.singup.create'), this.translate.instant('app.name'));
          this.model = {};
          this.modelRegister = {};
          this.showRegisterForm = false;
        }else{
          this.toastr.error(this.translate.instant('app.singup.error'), this.translate.instant('app.name'));
        }
      },
      err => {
        this.toastr.error(this.translate.instant('app.request.error'), this.translate.instant('app.name'));     
      }
    );
  }

  switchLanguage(opcion = '') {
    this.App.switchLanguage(opcion);
  }

}
