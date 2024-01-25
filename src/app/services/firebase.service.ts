import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from '../../environment';
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, Auth, UserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public app: FirebaseApp;
  private auth: Auth;
  public user?: User;
  public googleProvider: GoogleAuthProvider;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth();
    this.auth.useDeviceLanguage();
    //google
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');


    this.user = this.getUserFromLocalStorage();
  }

  public async login(email: string, password: string): Promise<string | void> {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.authenticate(userCredential);
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

  public async register(email: string, password: string) {
    console.log("test");
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        this.authenticate(userCredential);
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
    this.autoRedirect();
  }

  public logout() {
    this.auth.signOut().then(() => {
      this.user = undefined;
      localStorage.removeItem('userAuth');
      //this.autoRedirect();
      this.router.navigate(['/login']);
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
