import { Injectable, Inject } from '@angular/core';
import { Todo } from '../state/todo/todo.model';
import { collection, Firestore, getDocs } from 'firebase/firestore';
import { from } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(
    private  firebase: FirebaseService
  ) { }

  async getAllAsync() {
    const coll = collection(this.firebase.firestore, "todos")
    const snapshot = await getDocs(coll);
    const data = snapshot.docs.map(d => d.data() as Todo);

    return data;
  }
  getAllTodos() {
    const temp = this.getAllAsync();
    return from(temp);
  }
}
