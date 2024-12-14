import { Injectable, Inject } from '@angular/core';
import { Todo, TodoToUpdate } from '../state/todo/todo.model';
import * as todosActions from "../state/todo/todo.actions";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  firestore: Firestore;
  todosCollection: CollectionReference;
  
  constructor(
    private firebase: FirebaseService,
    private authService: AuthService,
    private store: Store
  ) {
    this.firestore = this.firebase.firestore;
    this.todosCollection = collection(this.firestore, "todos");
  }

  async getAllTodos(uid: string) {
    try {
      const q = query(
        this.todosCollection,
      where("ownerId", "==", uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ ...d.data() as Todo, id: d.id }));

      return data;
    } catch (e) {
      throw e;
    }
  }


  async getSingleTodo(id: string) {
    try {
      const temp = doc(this.todosCollection, id);
      const snapshot = await getDoc(temp);
      return { ...snapshot.data() as Todo, id: snapshot.id };
    }
    catch (e) {
      throw e;
    }
  }


  async createTodo(todo: Todo) {
    try {
      const docref = await addDoc(
        this.todosCollection,
        todo
      );
    } catch (e) {
      throw e;
    }
  }


  async updateTodo(id: string, todoToUpdate: TodoToUpdate) {
    try {
      const todo = doc(this.todosCollection, id);
      await updateDoc(todo, { ...todoToUpdate });
    } catch (e) {
      throw e;
    }
  }


  async removeTodo(id: string) {
    try {
      const todo = doc(this.todosCollection, id);
      await deleteDoc(todo);
    } catch (e) {
      throw e;
    }
  }


}
