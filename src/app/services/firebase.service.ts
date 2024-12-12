import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth} from 'firebase/auth';
import { firebaseConfig } from '../firebase/appConfig';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  
  constructor() { 
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }
}
