import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    const formValue: { username: string, password: string } = this.loginForm.getRawValue();
    const {username, password} = formValue;

    this.userService.login(username, password).subscribe((value) => {
        if (value) {
          if (this.userService.currentUserValue?.role === 'ADMIN') {
            this.router.navigate(["/plant-user/plant-list-admin"]);

          } else {
            this.router.navigate(["/plant-user/plant-list-user"]);
          }
        } else {
          this.snackBar.open("Username or password incorrect", "OK", {duration: 8000});
        }
      },
      () => {
        this.snackBar.open("Unexpected error occurred!", "OK", {duration: 8000});
    });
  }
}
