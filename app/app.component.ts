import { Component } from '@angular/core';
import {User} from "./login/models/user.model";
import {UserService} from "./login/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: boolean = false;
  currentUser!: User | null;

  constructor(private userService: UserService) {

    this.userService.currentUserSubject.subscribe(currentUser => {
      this.isLoggedIn = !!currentUser;
      this.currentUser = currentUser;
    });

    this.userService.currentUser.subscribe((user) => this.currentUser = user);
  }
}
