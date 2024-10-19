import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(public fb: FormBuilder, private service :AuthService, private toastr: ToastrService){
  }

  passwordMatchValidator:ValidatorFn = (control:AbstractControl):null =>{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword')

    if(password && confirmPassword && password.value != confirmPassword.value){
      confirmPassword?.setErrors({passwordMismatch:true})
    }
    else{
      confirmPassword?.setErrors(null)
    }
    return null
  }

  form =this.fb.group({
  fullName:['', Validators.required],
  email:['', [Validators.email, Validators.required]],
  password: ['', [Validators.required]],
  confirmPassword:[''],
  }, {validators: this.passwordMatchValidator});

  submit(){
    console.log(this.form.controls)
    this.service.createUser(this.form.value).subscribe({
      next:(res:any)=>{ 
        if(res.succeeded){
          this.toastr.success('User Registered Successfuly', 'New user added')
        }
        },
      error:err=>{console.log(err)}
     
    })
  }

}
