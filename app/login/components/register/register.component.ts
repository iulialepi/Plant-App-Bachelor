import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import { HttpClient } from '@angular/common/http';
import {User} from "../../models/user.model";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public signUpForm !: FormGroup

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private userService: UserService, private router: Router,
              private snackBar: MatSnackBar, private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onRegister() {
    if (this.signUpForm.valid) {
      const username = this.signUpForm.value.username;
      const password = this.signUpForm.value.password;

      const newUser: User = { id: 0, name: '', email: '', username, password, role: 'USER'}; // Adjust the initial values

      this.userService.register(newUser).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Show a success message using MatSnackBar
          this.snackBar.open('Registration successful! Please log in.', 'Dismiss', {
            duration: 5000
          });

          // Navigate to the login page
          this.router.navigate(['/login/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
