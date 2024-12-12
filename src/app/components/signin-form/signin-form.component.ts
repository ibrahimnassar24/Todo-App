import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as authActions from '../../state/auth/auth.actions';
@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css'
})
export class SigninFormComponent {
  
  constructor(
    private store: Store
  ) {}
  signInFormState = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  onSignIn(e: Event) {
    const temp = {
      email: this.signInFormState.value.email as string,
      password: this.signInFormState.value.password as string
    };
    
    this.store.dispatch(authActions.signInWithEmailAndPassword( temp ));
  }
}
