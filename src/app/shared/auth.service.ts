import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve) => {
        resolve(this.loggedIn);
      }
    );
    return isUserAdmin;
  }
}
