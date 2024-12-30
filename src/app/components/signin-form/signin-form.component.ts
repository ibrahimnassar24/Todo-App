import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as authActions from '../../state/auth/auth.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";


@Component({
  selector: 'app-signin-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss'
})
export class SigninFormComponent {

  constructor(
    private store: Store
  ) { }
  signInFormState = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  onSignIn(e: Event) {
    e.preventDefault();
    const temp = {
      email: this.signInFormState.value.email as string,
      password: this.signInFormState.value.password as string
    };

    this.store.dispatch(authActions.signInWithEmailAndPassword(temp));
  }

  signInUsingGoogle() {
    console.log("sign in using google");
    // this.store.dispatch(authActions.SignInWithGoogle());
  }

  signInUsingFacebook() {
    console.log("sign in using facebook");
    this.store.dispatch(authActions.signInWithFacebook());
  }
}
