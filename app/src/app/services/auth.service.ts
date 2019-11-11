import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  excluirMinhaConta() {
    var user = this.afa.auth.currentUser
    return user.delete().then(function () {
    }).catch(function (error) {

    });
  }

  updateUser(user: User) {
    var ser = this.afa.auth.currentUser;
    ser.updateProfile({
      displayName: user.nome,
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  resetPassword(email: string) {
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  logout() {
    return (this.afa.auth.signOut());
  }

  getAuth() {
    return this.afa.auth;
  }

  isLogged() {
    if (this.afa.auth != null) {
      return true;
    } else {
      return false;
    }
  }


}
