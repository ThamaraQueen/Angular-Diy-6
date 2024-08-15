# DIY 6

## DESCRIPTION
In this excercise we will create an app with 2 components:   
* __Register__: Registration will save your user name and password in local storage.  
* __Secret__: show the secret, in our case the user’s password.  
Only those who have registered in can see the secret page.
  
The application demonstrates basic Angular concepts such as two-way data binding, routing, form handling, and local storage manipulation. This project is a foundational exercise in user authentication and data management within a web application.  

## STEP 1: Set Up the Angular App

First, let's creat a new Angular project:
```bash
ng new secret-app
cd secret-app
ng serve
```

## STEP 2: Create the Components

Now, we'll generate the two components: 

```bash
ng generate component Register
ng generate component Secret
```

## STEP 3: Update `app-routing.module.ts`

We should add the routes to navigate between the `Register` and `Secret` components:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SecretComponent } from './secret/secret.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'secret', component: SecretComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
## STEP 4: Implement the `RegisterComponent`

Update the `register.component.ts` and `register.component.html` files to handle user registration.

`register.component.ts`
```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // First create the variables with an empty string
  username = '';
  password = '';

  constructor(private router: Router) {} //This allows the component to control navigation within the app, like redirecting the user.

  register() {
    // This function will storage the info into the local storage
    if (this.username && this.password) {
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      // And will take us to the secret page where we can se the password
      this.router.navigate(['/secret']);
    }
  }
}
```

`register.component.html`
```html
<h2>Register</h2>
<form (ngSubmit)="register()">
  <label for="username">Username:</label>
  <input type="text" id="username" [(ngModel)]="username" name="username" required>

  <label for="password">Password:</label>
  <input type="password" id="password" [(ngModel)]="password" name="password" required>

  <button type="submit">Register</button>
</form>

```
We may have an error because we haven't imported the `FormModule` into the `app.module.ts`, so make sure to do that first.

## STEP 5: Implement the `SecretComponent`

Update the `secret.component.ts` and `secret.component.html` files to display the user’s password if they are registered.

`secret.component.ts`
```ts
//IMPORT STATEMENTS
import { Component, OnInit } from '@angular/core';
// OnInit method is called when the component is initialized
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
  secret: string | null = '';
  // This property stores the user's password. It can be either  a string or null

  constructor(private router: Router) {}

  ngOnInit(): void {
    //This variable will retrieve the saved password from the local storage. If the user has register
    const password = localStorage.getItem('password');
    if (password) {
      this.secret = password;
    } else {
      // If no password is found, the app navigates back to the registration page
      this.router.navigate(['/register']);
    }
  }
}
```

`secret.component.html`
```html
<h2>Secret Page</h2>
<p *ngIf="secret">Your password is: {{ secret }}</p>
```

## STEP 6: Update `app.component.html`
Link the components for easier navigation:
```html
<nav>
  <a routerLink="/register">Register</a>
  <a routerLink="/secret">Secret</a>
</nav>
<router-outlet></router-outlet>
```

## STEP 7: Serve the Application

Finaly, run the application: 

```bash
ng serve
```
