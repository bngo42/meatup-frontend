import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../home/home';
import { RequestProvider } from '../../providers/request/request';
import { MenuController } from 'ionic-angular/components/app/menu-controller';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm : FormGroup;
  private registerForm : FormGroup;

  public errorMsg : string;
  private loginPage : boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public request : RequestProvider,
    public menuCtrl : MenuController
  ){
    this.menuCtrl.swipeEnable(false);
    let token = localStorage.getItem('id_token');

    if (token){
      this.request.checkToken({ token })
        .then(res => {
          let data = res.json();
        
          if (data.success){  
            this.navCtrl.setRoot(HomePage);
          } else {
            this.request.logout();
          }
        })
        .catch(console.error);
    }
     this.errorMsg = "";

    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      username : ['', Validators.required],
      password : ['', Validators.required]
    });

  }

  public console(...val){
    for (let i=0; i < val.length; i++)
      console.log(val[i]);
  }

  public setError(err : string) : void {
    this.errorMsg = err;
  }

  public checkObject(obj : Object) : boolean {
    for(var key in obj) {
      if (obj[key] == null){
        this.setError(key + " is empty");
        return false;
      }
    }
    this.setError("");
    return true;
  }

  public login(){
    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.request.login(val)
        .then(res => {
          let data = res.json();

          if (data.success){
            this.setError("");
            console.log(data.success);
            this.request.setSession(data.success);
            this.navCtrl.setRoot(HomePage);
          } else if (data.error) {
            this.setError(data.error);
          }
        })
        .catch(console.error);
    }
  }

  public register(){
    this.request.register(this.registerForm.value)
      .then(res => {
        let data = res.json();

        if (data.error){
          this.setError(data.error);
        }else {
          this.togglePage();
        }
      })
      .catch(console.error);
  }

  public togglePage(){
    this.loginPage = !this.loginPage;
    this.setError("");
  }
}
