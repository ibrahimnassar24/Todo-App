import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { setProfileInitialValues } from '../state/profile/profile.actions';
import {
  Auth,
  onAuthStateChanged,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  auth: Auth;
  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.auth = this.authService.auth;
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.store.dispatch(setProfileInitialValues({
          data: {
            displayName: user.displayName ?? "",
            email: user.email ?? "",
            phoneNumber: user.phoneNumber ?? "",
            photoUrl: user.photoURL ?? ""
          }
        }));
      }
    })
  }

  async updateProfileDisplayName(displayName?: string) {
    try {
      const user = this.auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName
        });
      }
    }
    catch (e) {
      console.log(e)
      throw e;
    }
  }


  async updateProfilePhotoUrl(photoURL: string) {
    try {
      const user = this.auth.currentUser;
      if (user) {
        await updateProfile(user, {
          photoURL
        });
      }
    }
    catch (e) {
      console.log(e)
      throw e;
    }
  }


  async changePhoneNumber(phoneNumber: string) {
    try {


    } catch (e) {
      console.log(e);
      throw e;
    }
  }


}
