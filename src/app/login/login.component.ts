import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

const EMAIL = 'srochoap@eafit.edu.co';
const PASSWORD = '123456';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userInfo = {
    username: 'Sebastian Ochoa',
    name: 'Sebastián Ricardo',
    lastname: 'Ochoa Pete',
    email: 'srochoap@eafit.edu.co'
  }

  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private http : HttpClient, private router : Router) {}

  showLoginn: boolean = true; 
  showForm: boolean = false;
  showMensageEmail: boolean = false; 
  

  onLoginClick() {
    this.router.navigate(['/formulario']);
    this.showLoginn = false; 
    this.showForm = true;
  }

  onLoginClickPassword() {
    this.router.navigate(['/password']);
    this.showLoginn = false; 
    this.showMensageEmail = true;
  }
  errorMessage = '' 
  
  formLogin = new FormGroup({
    email:  new FormControl('', [Validators.required]),
    password:  new FormControl('', [Validators.required])
  });
  
  onSubmit(){

    if(!this.formLogin.valid){
      this.errorMessage = 'El formulario no está completo.';
      return;
    }
  }

  login() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json',})}
    const data = this.formLogin.value;
    console.log(data);
    this.http.post<any>('http://localhost:8080/authorizations/login', data, httpOptions).subscribe(res=> {
      console.log(res);
      this.formLogin.reset();
      this.router.navigate(['/home']);
    });
  }
}

//if(this.email === EMAIL && this.password === PASSWORD ) {
     // localStorage.setItem('user', JSON.stringify(this.userInfo) );
     // this.router.navigate(['/home'])
    //}else {
     // this.loginError = true;
    //}

