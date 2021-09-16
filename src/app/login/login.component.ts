import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
  state
} from "@angular/animations";
import { MatDialog } from '@angular/material/dialog';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginService } from '../master/service/login.service';
import { LoginPojo } from '../master/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*',
        width: '300px'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  @ViewChild("username") username!: ElementRef;
  loginForm!: FormGroup;
  public screenWidth: any;
  public screenHeight: any;
  loginpojo = new LoginPojo();

  constructor(private dialog: MatDialog, private loginservice: LoginService, private fb: FormBuilder, private router: Router, private appcomp: AppComponent) {

  }

 

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loginForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
    setTimeout(() => {
      this.username.nativeElement.focus();
    }, 0);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  forgotpassword() {
    if (!this.loginForm.controls.username.value) {
      alert("User Name Should Not be Empty");
      return;
    }
    const dialogRef = this.dialog.open(ForgotpasswordComponent, {
      maxWidth: '400px',
      minWidth: '400px',
      minHeight: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(data => {
      this.loginservice.resetpassword(data).then(data => {
        alert("Successfully Reset the Password");
        this.username.nativeElement.focus();
      }, err => {
        alert(err);
        return;
      });
    });
  }

  showOptions(event: any) {
    if (event.checked === true) {
      this.loginpojo.username = this.loginForm.controls.username.value;
      this.loginpojo.password = this.loginForm.controls.password.value;
      if (localStorage.getItem('login')) {
        localStorage.removeItem('login');
        localStorage.setItem('login', JSON.stringify(this.loginpojo));
      } else {
        localStorage.setItem('login', JSON.stringify(this.loginpojo));
      }
    } else {
      if (localStorage.getItem('login')) {
        localStorage.removeItem('login');
      } else {
        return;
      }
    }
  }

  login() {
    debugger;
    this.loginpojo.username = this.loginForm.controls.username.value;
    this.loginpojo.password = this.loginForm.controls.password.value;
    if (!this.loginpojo.username) {
      alert('Username Should Not Be Empty');
      return;
    } else if (!this.loginpojo.password) {
      alert('Password Should Not Be Empty');
      return;
    }
    debugger;
    this.loginservice.login(this.loginpojo).then(data => {
      if (data.status) {
        debugger;
        this.appcomp.topnav = true;
        this.loginpojo.empcode = data.result[0].empcode;
        this.loginpojo.username = data.result[0].empname;
        this.loginpojo.empLevel = data.result[0].empLevel;
        sessionStorage.setItem('logindet', JSON.stringify(this.loginpojo));
        this.username.nativeElement.focus();
        this.router.navigate(['/dashboard']);

      }
    }, err => {
      alert(err);
    });
    this.appcomp.dashboardview();
  }

  checkisuser() {
    // this.loginservice.namecheck(this.loginForm.controls.username.value).then(data => {
    return;
    // }, err => {
    //   alert("User Not Exists");
    //   this.username.nativeElement.focus();
    // });
  }
}