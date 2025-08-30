import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
    constructor () {
      console.log("constructor")
    }
    ngOnInit(): void {
      console.log('on init')
    }
}
