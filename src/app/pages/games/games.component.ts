import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-games',
  imports: [RouterOutlet],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  standalone: true
})
export class GamesComponent implements OnInit {
  constructor() {
    console.log('constructor');
  }
  ngOnInit(): void {
    console.log('on init');
  }
}
