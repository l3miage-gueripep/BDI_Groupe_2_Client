import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected loginForm: FormGroup;
  protected error?: string | void;


  constructor(private firebaseService: FirebaseService) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });


  }

  public async login(){
    const { email, password } = this.loginForm.value;
    this.error = await this.firebaseService.login(email, password);
    console.log(this.error);

    if (this.error) {
      this.loginForm.get('password')!.setValue('');
    }
  }

  public async loginWithGoogle(){
    await this.firebaseService.loginWithGoogle();
  }
}
