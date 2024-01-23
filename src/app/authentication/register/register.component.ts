import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  protected registerForm: FormGroup;
  protected loginForm: FormGroup;
  

  constructor(private firebaseService: FirebaseService) { 
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      //password
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      //confirmPassword
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  


  public async register(){
    const { email, password } = this.registerForm.value;
    await this.firebaseService.register(email, password);
  }

  public async login(){
    const { email, password } = this.loginForm.value;
    await this.firebaseService.login(email, password);    
  }

  public async loginWithGoogle(){
    await this.firebaseService.loginWithGoogle();
  }
}
