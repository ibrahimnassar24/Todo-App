import { Component } from '@angular/core';
import { SigninFormComponent } from '../../components/signin-form/signin-form.component';
import { Store } from '@ngrx/store';
import * as authActions from '../../state/auth/auth.actions';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';

@Component({
    selector: 'app-log',
    imports: [
        SigninFormComponent,
        SignupFormComponent
    ],
    templateUrl: './log.page.html',
    styleUrl: './log.page.css'
})
export class LogPage {
  
  constructor(
    private store: Store
  ) {}
  signin = true;

  toggleSignin() {
    this.signin = !this.signin;
  }

  signOut() {
    this.store.dispatch(authActions.signOut())
  }

}
