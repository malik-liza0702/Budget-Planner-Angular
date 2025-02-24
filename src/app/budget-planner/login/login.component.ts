import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder,ReactiveFormsModule,Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:any;
  registerForm:any;
  activeForm:'login'|'register'='login';

  constructor(private fb:FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar){}
  ngOnInit(){
      this.loginForm=this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      });
      this.registerForm=this.fb.group({
        username:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      })

  }
  toggleForm(form:'login'|'register'){
    this.activeForm=form;

  }
  login(){
    if(this.loginForm.valid){
      console.log("Login Form info=>",this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    }
    else{
      // snackbar is an error popup imported from angular materials
      this.snackBar.open('Invalid email or passowrd','Close',{duration:3000});
    }

  }
  register(){
    if(this.registerForm.valid){
      console.log("Register info=>",this.registerForm.value);
      setTimeout(()=>{
        window.location.reload();
      },2000);
      this.router.navigate(['/budget-planner/login']);
    }
    else{
      this.snackBar.open('Please fill all the fields correctly!','Close',{duration:10000});
    }
  }

  
}
