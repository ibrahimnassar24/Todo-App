import { inject, Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import QrCode from 'qrcode';
import { FirebaseService } from './firebase.service';
import * as authActions from "../state/auth/auth.actions";
import {
  ActionCodeSettings,
  Auth,
  AuthCredential,
  AuthError,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  FacebookAuthProvider,
  getAuth,
  getMultiFactorResolver,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  multiFactor,
  MultiFactorError,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  TotpMultiFactorGenerator,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail
} from 'firebase/auth';
import { convertUserToUserdetails } from '../state/auth/auth.model';
import { DialogBoxService } from './dialog-box.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth;

  constructor(
    private firebase: FirebaseService,
    private store: Store,
    private dialogBox: DialogBoxService
  ) {
    this.auth = this.firebase.auth;
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const temp = convertUserToUserdetails(user);
        
        this.store.dispatch( authActions.confirmAuthentication({ user: temp }))
      } else {
        this.store.dispatch(authActions.confirmSignOut());
      }
    })
  }


  async signUpWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log("sign up successfully");
      return userCredential.user;
    } catch (e) {
      throw e;
    }
  };


  async signInUsingEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (e) {

      if ((e as AuthError).code == "auth/multi-factor-auth-required") {
        const user = await this.signInWithTotp(e as MultiFactorError);
        return user;
      } else {
        throw e;
      }
    }
  }


  async signInWithEmail(email: string) {
    try {
      const settings: ActionCodeSettings = {
        url: "http://localhost:4200/test",
        handleCodeInApp: true
      };
      await sendSignInLinkToEmail(this.auth, email, settings);
      window.localStorage.setItem("email", email);

      console.log("sign in link was sent")
    } catch (e) {
      throw e;
    }
  }


  async confirmSignInWithLink() {
    try {
      const link = window.location.href;
      const temp = isSignInWithEmailLink(this.auth, link);
      if (!temp) throw "not a sign in link";
      let email = window.localStorage.getItem("email");
      if (!email) {
        email = prompt("enter your email") ?? "";
      }
      const userCredential = await signInWithEmailLink(this.auth, email, link);
      console.log("you have signed in with email link")
    } catch (e) {
      throw e;
    }
  }


  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      console.log("you have signed in with google");
    } catch (e) {
      throw e;
    }
  }


  async signInWithFacebook() {
    try {

      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      console.log("you have been signed in using facebook");
    } catch (e) {
      throw e;
    }
  }


  async logOut() {
    try {
      await signOut(this.auth);
      console.log("sign out successfully")
    } catch (e) {
      throw e;
    }
  }


  async sendVerificationEmail() {
    try {
      const settings: ActionCodeSettings = {
        url: "http://localhost:4200/email-verification",
        handleCodeInApp: true
      };
      const user = this.auth.currentUser;
      if (user == null) throw "sign in first";
      await sendEmailVerification(user, settings);
    } catch (e) {
      throw e;
    }
  }

  async confirmVerificationEmail() {
    try {

    } catch (e) {
      throw e;
    }
  }


  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const user = this.auth.currentUser;
      await this.reauthenticate(oldPassword);

      await updatePassword(user!, newPassword);

    } catch (e) {
      throw e;
    }
  }


  async sendEmailToResetPassword(email: string) {
    try {
      const settings: ActionCodeSettings = {
        url: "http://localhost:4200/test",
        handleCodeInApp: true
      };
      await sendPasswordResetEmail(this.auth, email, settings)

      console.log("reset password email has been sent");
    } catch (e) {
      throw e;
    }
  }

  async confirmPasswordResetEmail(newPassword: string) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get("oobCode");
      if (!oobCode) throw "not a correct link";
      await confirmPasswordReset(this.auth, oobCode, newPassword);

      console.log("password reset has been confirmed");
    } catch (e) {
      throw e;
    }
  };



  async deleteUser(password: string) {
    try {
      await this.reauthenticate(password);
      await this.auth.currentUser?.delete();
      console.log("user has been deleted");
    } catch (e) {
      throw e;
    }
  }


  async reauthenticate(password: string) {
    try {
      const { currentUser } = this.auth;
      if (!currentUser) throw "you need to sign in";
      const { email } = currentUser;
      const credentials = EmailAuthProvider.credential(email!, password);
      const userCredential = await reauthenticateWithCredential(currentUser, credentials);
      console.log("got reauthenticated");
    } catch (e) {
      throw e;
    }
  }


  async enrollTotp() {
    try {
      
      const password = await this.dialogBox.openDialog("enter your password");
      await this.reauthenticate(password);

      const user = this.auth.currentUser;
      if (!user) throw "authentication required";
      const session = await multiFactor(user).getSession();
      const totpSecret = await TotpMultiFactorGenerator.generateSecret(session);
      const qrStr = totpSecret.generateQrCodeUrl(
        user.email!,
        "Todo Web App"
      );
      const totp = await this.getTotp(qrStr);
      const assertion = TotpMultiFactorGenerator.assertionForEnrollment(
        totpSecret,
        totp
      );
      await multiFactor(user).enroll(
        assertion,
        "Microsoft Authenticator"
      );

      console.log("you have been enrolled in TOTP")
    } catch (e) {
      throw e;
    }
  }


  async getTotp(data: string) {
  
    try {
      const url = await this.generateQrCode(data);
      const totp = await this.dialogBox.openDialog(
        "please scan the QR code then enter the one-time password",
        url
      );
      return totp;
    } catch(e) {
      throw e;
    }
  }

  private generateQrCode( data: string) {
    return new Promise<string>( (resolve, reject) => {
      QrCode.toDataURL(
        data,
        (e, url) => {
          if (e) {
            reject(e);
          } else {
            resolve(url);
          }
        }
      );
    });
  }


  async signInWithTotp(error: MultiFactorError) {
    try {
      const resolver = getMultiFactorResolver(this.auth, error);
      const totp = await this.dialogBox.openDialog("enter the TOTP from the authenticator app");
      const assertion = TotpMultiFactorGenerator.assertionForSignIn(
        resolver.hints[0].uid,
        totp!
      );
      const userCredential = await resolver.resolveSignIn(
        assertion
      );
      return userCredential.user;
    } catch (e) {
      throw e;
    }
  }


  async unenrollFromTotp( enrollmentId: string) {

    try {
      const user = this.auth.currentUser;
      if (!user) throw "you should sign in first";
      const mfa = multiFactor(user);
      await mfa.unenroll(enrollmentId)
    } catch (e) {

      if ((e as AuthError).code == "auth/user-token-expired") {
        console.log("you have unenrolled from TOTP");
        await this.logOut();
      } else {
        throw e;
      }

    }
  }


  async setEmail(email: string) {
    try {
      const dialogBox = this.dialogBox;
      const user = this.auth.currentUser;
      if (user) {
        const password = await dialogBox.openDialog("Please enter your password");
        await this.reauthenticate(password);
        await verifyBeforeUpdateEmail(user, email, null);
      } else {
        throw "authentication required";
      }
    } catch(e) {
      console.log(e);
      throw e;
    }
  }


  isLogged() {
    const temp = this.auth.currentUser != null

    return temp;
  }

  getCurrentUserUid() {
    if (!this.auth.currentUser) throw "you should sign in first";
    return this.auth.currentUser.uid;
  }

}
