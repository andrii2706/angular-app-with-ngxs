import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creators',
  imports: [],
  templateUrl: './creators.component.html',
  styleUrl: './creators.component.scss'
})
export class CreatorsComponent implements OnInit {
    constructor () {
      console.log("constructor")
    }
    ngOnInit(): void {
      console.log('on init')
    }
}
