import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrl: './secret.component.css'
})
export class SecretComponent implements OnInit{
  secret: string | null = "";

  constructor(private router: Router){}

  ngOnInit(): void {
    const password = localStorage.getItem('password');

    if(password){
      this.secret = password;
    } else {
      this.router.navigate(['./register']);
    }
  }

}
