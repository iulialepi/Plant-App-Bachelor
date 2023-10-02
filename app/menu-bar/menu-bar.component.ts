import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../login/services/user.service";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login/login']); // Navigate to login page after logout
  }
}
