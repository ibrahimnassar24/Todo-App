import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as authActions from "../../state/auth/auth.actions";
import * as authSelectors from "../../state/auth/auth.selectors";
import { DialogBoxService } from "../../services/dialog-box.service"
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { MultiFactorInfo } from 'firebase/auth';

@Component({
  selector: 'app-security-page',
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule
  ],
  templateUrl: './security-page.component.html',
  styleUrl: './security-page.component.scss'
})
export class SecurityPageComponent {

  email$: Observable<string | null>;
  emailVerified$: Observable<boolean | null>;
  mfa$: Observable<MultiFactorInfo[]>;

  constructor(
    private store: Store,
    private dialogBox: DialogBoxService
  ) {
    this.email$ = this.store.select(authSelectors.selectEmail);
    this.emailVerified$ = this.store.select(authSelectors.selectEmailVerified);
    this.mfa$ = this.store.select(authSelectors.selectMfa);
  }

  async onUpdateEmail() {
    const email = await this.dialogBox.openDialog("enter the new email");
    this.store.dispatch(
      authActions.updateEmail({ email })
    );
  }

  onVerifyEmail() {
    this.store.dispatch(
      authActions.initiateEmailVerification()
    );
  }

  async onUpdatePassword() {
    const currentPassword = await this.dialogBox.openDialog("enter your current password");
    const newPassword = await this.dialogBox.openDialog("enter yourr new password");
    this.store.dispatch(
      authActions.updatePassword({
        currentPassword,
        newPassword
      })
    );
  }

  onEnrollTopt() {
    this.store.dispatch(authActions.enrollTotp())
  }

  onUnrollFromTotp( enrollmentId: string) {
    this.store.dispatch(
      authActions.unenrollFromTotp({ enrollmentId})
    )
  }

}
