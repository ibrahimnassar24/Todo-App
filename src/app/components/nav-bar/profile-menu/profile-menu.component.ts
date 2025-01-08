import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as authActions from "../../../state/auth/auth.actions";
import * as authSelectors from "../../../state/auth/auth.selectors";
import * as profileActions from "../../../state/profile/profile.actions";
import * as profileSelectors from "../../../state/profile/profile.selectors";
import { UserInfo } from 'firebase/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  imports: [
    CommonModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  photoUrl$: Observable<string | null | undefined>;
  displayName$ : Observable<string | null | undefined>;
  isLogged$: Observable<boolean>;

  constructor(
    private store: Store
  ) {
    this.photoUrl$ = this.store.select(profileSelectors.selectPhotoUrl);
    this.displayName$ = this.store.select(profileSelectors.selectDisplayName);
    this.isLogged$ = this.store.select(authSelectors.selectIsLogging);
  }

  signOut() {
    this.store.dispatch(authActions.signOut());
  }

}
