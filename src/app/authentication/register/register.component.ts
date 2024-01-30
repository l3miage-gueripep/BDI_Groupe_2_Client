import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  protected registerForm: FormGroup;
  protected isLoading = false;


  constructor(private firebaseService: FirebaseService) {
    this.passwordsMatchValidator = this.passwordsMatchValidator.bind(this);
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      //password
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      //confirmPassword
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNotMatching: true };
  }

  public async register(){
    this.isLoading = true;
    const { email, password } = this.registerForm.value;
    await this.firebaseService.register(email, password);
  }



  public async loginWithGoogle(){
    await this.firebaseService.loginWithGoogle();
  }
}
