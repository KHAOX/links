import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public form!: FormGroup;
  model: any = {};

  userdata: any = {};
  
  links = [];
  
  constructor(
    public App: AppComponent,
    private frmBuilder: FormBuilder,
    private Services: AppService,
    private toastr: ToastrService,
    private Auth: AuthService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.form = this.frmBuilder.group({
      url: ['', Validators.required],
      name: ['', Validators.required]
    });

    this.Services.get('user/1').subscribe(
      res => {
        this.userdata = JSON.parse(res);
      },
      err => {
        this.toastr.error(this.translate.instant('app.modules.dashboard.profile.loaderror'), this.translate.instant('app.name'));
      }
    );

    this.loadLinks();
  }

  loadLinks(){
    this.Services.get('links').subscribe(
      res => {
        const regex = /\,(?!\s*?[\{\[\"\'\w])/g;
        let dataString = res.replace('name', '').replace(regex, '');
        this.links = JSON.parse(dataString);
      },
      err => { console.log(err); }
    );
  }

  createUrl(){
    this.Services.post('links', this.model).subscribe(
      res => {
        this.toastr.error(this.translate.instant('app.request.create'), this.translate.instant('app.name'));
      },
      err => {
        this.toastr.error(this.translate.instant('app.request.error'), this.translate.instant('app.name'));
      }
    );
  }

  logout(){
    this.Auth.logOut();
  }

  deleteLink(item = 1) {
    if (confirm(this.translate.instant('app.request.delete.question'))) {
      this.Services.delete('delete', {id: 1}).subscribe(
        res => {
          this.toastr.success(this.translate.instant('app.request.delete'));
        },
        err => console.error(err)
      );
    } else {
      this.toastr.error(this.translate.instant('app.request.canceled'));
    }
  }

  switchLanguage(opcion = '') {
    this.App.switchLanguage(opcion);
  }

}