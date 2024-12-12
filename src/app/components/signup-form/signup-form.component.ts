import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as authActions from '../../state/auth/auth.actions';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
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

  allowSubmit() {
    // return this.signUpFormState.value.password === this.signUpFormState.value.confirm;
    return false
  }

}
