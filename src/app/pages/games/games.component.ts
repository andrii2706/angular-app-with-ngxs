import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent implements OnInit {
  constructor() {
    console.log('constructor');
  }
  ngOnInit(): void {
    console.log('on init');
  }
}
