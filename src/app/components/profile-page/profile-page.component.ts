import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from "@angular/material/grid-list";
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as authSelectors from "../../state/auth/auth.selectors";
import * as authActions from "../../state/auth/auth.actions";
import * as profileActions from "../../state/profile/profile.actions";
import * as profilSelectors from "../../state/profile/profile.selectors";

@Component({
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    MatGridListModule,
    EditBtnComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  displayName$: Observable<string | null | undefined>;
  photoUrl$: Observable<string | null | undefined>;

  constructor(
    private store: Store
  ) {
    this.displayName$ = this.store.select(profilSelectors.selectDisplayName);
    this.photoUrl$ = this.store.select(profilSelectors.selectPhotoUrl);
  }

  onEditDisplayName = (name: string) => {
    this.store.dispatch(
      profileActions.updateDisplayName({ displayName: name})      
    )
  };

  onEditPhotoUrl = (url: string) => {
    this.store.dispatch(
      profileActions.updatePhotoUrl({ photoUrl: url})
    );
  }
}
