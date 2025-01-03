import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as authActions from '../../state/auth/auth.actions';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    selector: 'app-signup-form',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule
    ],
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {

  constructor(
    private store: Store
  ) {}
  signUpFormState = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    confirm: new FormControl("")
  });

  onSignUp(e: Event) {
    const temp = {
      email: this.signUpFormState.value.email ?? "",
      password: this.signUpFormState.value.password ?? ""
    };
    this.store.dispatch(authActions.signUp(temp));
  }

  signUpUsingGoogle() {
    this.store.dispatch(authActions.SignInWithGoogle())
  }

  signUpUsingFacebook() {
    this.store.dispatch(authActions.signInWithFacebook());
  }


}
