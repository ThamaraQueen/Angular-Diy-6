import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = "";
  password = "";

  constructor(private router: Router){}

  register(){
    if(this.username && this.password){
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      this.router.navigate(['/secret']);
    }
  }
}
