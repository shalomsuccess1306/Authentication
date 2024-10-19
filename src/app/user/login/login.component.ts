import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public fb : FormBuilder, private serv : AuthService, private router: Router){}
 form = this.fb.group({
  email:['', Validators.required],
  password:['', Validators.required]
 })

 submit(){
  console.log(this.form.value);
  if(this.form.valid){
    this.serv.login(this.form.value).subscribe ({
      next:(res:any)=>{
  localStorage.setItem('Token',res.token)
  this.router.navigateByUrl('/dashboard')
      }
    })
  }
  
}
  
 

}
