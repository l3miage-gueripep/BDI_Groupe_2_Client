import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private firebaseService: FirebaseService) { 

  }

  public async logout(){
    await this.firebaseService.logout();
  }
}
