import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private router: Router) { }

  takeMeIn() {

    //preverjanje če je user noter bi moglo tukaj bit
    //alert('You are not logged in!');

    this.router.navigate(['/article-listing']);
  }

}
