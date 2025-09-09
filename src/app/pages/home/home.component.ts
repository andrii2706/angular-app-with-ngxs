import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  constructor() {
    console.log('constructor');
  }
  ngOnInit(): void {
    console.log('on init');
  }
}
