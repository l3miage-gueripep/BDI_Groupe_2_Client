import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import {AppService} from "../../services/app.service";
import {Adherent} from "../../modele/adherent.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  protected registerForm: FormGroup;
  protected isLoading = false;
  adherent: Adherent =  {
    nom:"",
    prenom:"",
    telephone:"",
    role: "FESTIVALIER",
    mail:""
  };
  estMailExit=false;

  constructor(private firebaseService: FirebaseService, private appService: AppService) {
    this.passwordsMatchValidator = this.passwordsMatchValidator.bind(this);
    this.registerForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(10)]),
      //password
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      //confirmPassword
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, { validators: this.passwordsMatchValidator });
    this.registerForm.valueChanges.subscribe((formValue) => {
      this.updateAdherent(formValue);
    });
  }

  updateAdherent(formValue: any) {
    this.adherent = {
      nom: formValue.nom,
      prenom: formValue.prenom,
      telephone: formValue.tel,
      role: "FESTIVALIER",
      mail: formValue.email,
    };
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNotMatching: true };
  }

  creatAdherent(adherent: Adherent) {
    this.appService.postAdherent(adherent).subscribe(
        (data) => {
          this.adherent = data;
          console.log('this.adherent',this.adherent)
        },
        (error) => {
          console.error('Error fetching adherent', error);
        }
    );
  }

  public async register(){
    this.isLoading = true;
    const { email, password } = this.registerForm.value;

    const result =  await this.firebaseService.register(email, password);
    if (result !== "success" && result === "auth/email-already-in-use"){
      this.estMailExit = true;
    }


    this.creatAdherent(this.adherent)

  }



  public async loginWithGoogle(){
    await this.firebaseService.loginWithGoogle();
  }
}
