import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as authSelectors from "../../state/auth/auth.selectors";
import * as todosSelectors from "../../state/todo/todo.selectors";
import * as authActions from "../../state/auth/auth.actions";
import * as todoActions from '../../state/todo/todo.actions'
import { Observable, take } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Auth } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { TodoApiService } from '../../services/todo-api.service';
import { Todo, TodoToUpdate } from '../../state/todo/todo.model';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './test.page.html',
  styleUrl: './test.page.css'
})
export class TestPage {

  email: string;
  password: string;
  todos: Observable<Todo[]>;
  constructor(
    private authService: AuthService,
    private todoApi: TodoApiService,
    private store: Store
  ) {
    this.email = "test.ibrahimnassar@gmail.com";
    // this.email = "ebrahim24111990@gmail.com";
    this.password = "zxc123";
    this.todos = this.store.select(todosSelectors.selectAllTodos);

  }

  register() {
    this.store.dispatch(authActions.signUp({ email: this.email, password: this.password }));
  }

  logIn() {
    this.store.dispatch(authActions.signInWithEmailAndPassword({ email: this.email, password: this.password }))
  }

  logOut() {
    this.store.dispatch(authActions.signOut());
  }

  print() {
    console.log(this.authService.isLogged())
  }



  verify() {
    this.store.dispatch(authActions.initiateEmailVerification())
  }

  confirmEmailVerification() {
    this.store.dispatch(authActions.confirmEmailVerification());
  }
  changePassword() {
    const currentPassword = prompt("Enter the current password") ?? "";
    const newPassword = prompt("Enter the new password") ?? "";
    this.store.dispatch(authActions.updatePassword({ currentPassword, newPassword }))
  }

  sendPasswordEmail() {
    this.authService.sendEmailToResetPassword(this.email);
  }

  confirmPasswordEmail() {
    const newPassword = prompt("Enter the new password");
    this.authService.confirmPasswordResetEmail(newPassword!)
  }

  signInWithLink() {
    this.store.dispatch(authActions.signInWithEmailLink({ email: this.email }))
  }

  confirmSignInLink() {
    this.store.dispatch(authActions.confirmSigninLink());
  }

  deleteUser() {
    const temp = prompt("enter password");
    this.authService.deleteUser(temp!);
  }

  reauthenticate() {
    const temp = prompt("enter your password")
    this.authService.reauthenticate(temp!);
  }

  enrollTotp() {
    this.authService.enrollTotp(this.password);
  }

  unenroll() {
    this.authService.unenrollFromTotp();
  }

  signInWithGoogle() {
    this.store.dispatch(authActions.SignInWithGoogle())
  }

  signInWithFacebook() {
    this.store.dispatch(authActions.signInWithFacebook())
  }

  test() {
    const temp: Todo = {
      ownerId: this.authService.getCurrentUserUid(),
      title: "testing task",
      content: "make way for the third test",
      status: "finished"
    };
    // this.todoApi.updateTodo("hjsh8NszWb4zwTFXhb9S", temp);
    this.todoApi.removeTodo("x93l1jmvHGdGlfrTxTzG");
  }
  getTodos() {
    const uid = this.authService.getCurrentUserUid();
    // this.todoApi.getSingleTodo("hjsh8NszWb4zwTFXhb9S")
    this.todoApi.getAllTodos(uid)
    .then(v => console.log(v))
  }

}