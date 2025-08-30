import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    constructor () {
      console.log("constructor")
    }
    ngOnInit(): void {
      console.log('on init')
    }
}
