import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {BackendService} from "../../back-end/services/back-end.service";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  local_url: string = "http://localhost:8080/user";
  isLogged: boolean = false;

  // holds the user updates
  currentUserSubject = new BehaviorSubject<User | null>(null);
  // share the user updates
  currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  public logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private backendService: BackendService) {
    const user = localStorage.getItem('currentUser');
    if (user && user.length) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.getValue();
  }

  login(username: string, password: string): Observable<any> {
    return this.backendService.post(this.local_url + "/login", {username, password})
      .pipe(map(user => {
        if (user) {
          this.isLogged = true;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser',JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      return user;
    }));
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  logout(): void {
    localStorage.removeItem('currentUser'); // Clear the stored user data
    this.currentUserSubject.next(null); // Clear the current user subject
    this.isLogged = false; // Reset the authentication status
    this.logoutEvent.emit();
  }

  register(user: User): Observable<any> {
    return this.backendService.post(this.local_url + '/register', user);
  }
}
