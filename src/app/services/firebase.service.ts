import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from '../../environment';
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, Auth, UserCredential, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app: FirebaseApp;
  private auth: Auth;
  public user?: User;
  public googleProvider: GoogleAuthProvider;
  prenomSource = new BehaviorSubject<string>('');
  currentPrenom = this.prenomSource.asObservable();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth();
    this.auth.useDeviceLanguage();
    //google
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');


    this.user = this.getUserFromLocalStorage();
    const prenom = localStorage.getItem('prenom');
    if (prenom) {
      this.prenomSource.next(prenom);
    }
  }

  public async login(email: string, password: string): Promise<string | void> {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.authenticate(userCredential);
        const user = userCredential.user;
        if (user) {
          console.log("User's name is", user.displayName);
        }
        //window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return errorCode;
      });
  }

  public async loginWithGoogle() {
    signInWithPopup(this.auth, this.googleProvider)
      .then((userCredential) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(userCredential);
        const token = credential!.accessToken;
        // The signed-in user info.
        this.user = userCredential.user;
        this.authenticate(userCredential);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

/*
  public async register(prenom: string,email: string, password: string): Promise<string> {
    console.log("inscription");
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      // Signed in
      this.authenticate(userCredential);

      const user = userCredential.user;
      if (user) {
        try {
          await updateProfile(user, {
            displayName: prenom
          });
          console.log("Profile updated successfully");
          this.prenomSource.next(prenom);
          localStorage.setItem('prenom', prenom);
        } catch (error: any) {
          console.warn("Error updating profile", error);
        }
      }

      return "success";
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.warn(errorCode, errorMessage);
      return errorCode;
    }
  }

 */
  public async register(prenom: string,email: string, password: string) {
    console.log("inscription");
    console.log('prenom',prenom)
    await createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in
          this.authenticate(userCredential);

          const user = userCredential.user;
          if (user) {
            updateProfile(user, {
              displayName: prenom
            }).then(() => {
              console.log("Profile updated successfully");
              this.prenomSource.next(prenom);
              localStorage.setItem('prenom', prenom);
            }).catch((error) => {
              console.warn("Error updating profile", error);
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn(errorCode, errorMessage);
        });
  }

  private authenticate(userCredential: UserCredential): void {
    this.user = userCredential.user;
    localStorage.setItem('userAuth', JSON.stringify(userCredential));
    if (this.user) {
      if (this.user.displayName) {
        this.prenomSource.next(this.user.displayName);
        localStorage.setItem('prenom', this.user.displayName);
      }
    }
    this.router.navigate(['/recherche']).then(() => window.location.reload());
  }

  public logout() {
    this.auth.signOut().then(() => {
      this.user = undefined;
      localStorage.removeItem('userAuth');
      //this.autoRedirect();
      //this.router.navigate(['/login']);
      window.location.reload();
      console.log('logout');
      localStorage.removeItem('prenom');
    });
  }

  private autoRedirect() {
    let redirectTo: string;
    if (this.user) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      redirectTo = returnUrl ? returnUrl : '';
    }
    else {
      redirectTo = '';
    }
    this.router.navigate([redirectTo]);
  }

  private getUserFromLocalStorage(): User | undefined {
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      const userAuthObj = JSON.parse(userAuth);
      return userAuthObj.user;
    }
    return undefined;
  }
}
