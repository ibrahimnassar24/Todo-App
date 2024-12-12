import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as authSelectors from "../../state/auth/auth.selectors";
import * as authActions from "../../state/auth/auth.actions";
import * as todoActions from '../../state/todo/todo.actions'
import { Observable, take } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Auth } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './test.page.html',
  styleUrl: './test.page.css'
})
export class TestPage {

  email: string;
  password: string;
  status: Observable<string>;
  constructor(
    private authService: AuthService,
    private store: Store
  ) {
    this.email = "test.ibrahimnassar@gmail.com";
    this.password = "qwe123";
    this.status = this.store.select(authSelectors.selectStatus);

  }

  register() {
    this.store.dispatch( authActions.signUp({ email: this.email, password: this.password}));
  }

  logIn() {
    this.store.dispatch(authActions.signInWithEmailAndPassword({ email: this.email, password: this.password}))
  }

  logOut() {
    this.store.dispatch( authActions.signOut() );
  }

  print() {
    console.log(this.authService.isLogged())
  }

  

  verify() {
    this.store.dispatch( authActions.initiateEmailVerification() )
  }

  confirmEmailVerification() {
    this.store.dispatch( authActions.confirmEmailVerification() );
  }
  changePassword() {
    const oldPassword = prompt("Enter the current password");
    const newPassword = prompt("Enter the new password");
    this.authService.changePassword(oldPassword!, newPassword!)
  }

sendPasswordEmail() {
  this.authService.sendEmailToResetPassword(this.email);
}

confirmPasswordEmail() {
  const newPassword = prompt("Enter the new password");
  this.authService.confirmPasswordResetEmail(newPassword!)
}

  signInWithLink() {
    this.store.dispatch( authActions.signInWithEmailLink({ email: this.email}) )
  }

  confirmSignInLink() {
    this.store.dispatch( authActions.confirmSigninLink() );
  }

  deleteUser() {
    const temp = prompt("enter password");
    this.authService.deleteUser(temp!);
  }

  reauthenticate() {
    const temp = prompt("enter your password")
    this.authService.reauthenticate(temp!);
  }

  enrollTotp() {
    this.authService.enrollTotp(this.password);
  }

unenroll() {
  this.authService.unenrollFromTotp();
}

signInWithGoogle() {
  this.store.dispatch( authActions.SignInWithGoogle() )
}

signInWithFacebook() {
  this.store.dispatch(authActions.signInWithFacebook() )
}

test() {
  this.store.dispatch(authActions.updateDisplayNameOrPhotoUrl({ displayName: "lionel messi"}));
}

}