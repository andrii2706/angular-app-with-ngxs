import { Component, inject, OnInit, signal } from '@angular/core';
import { GamesService } from '../../shared/services/games/games.service';
import { Game } from '../../shared/models/games.interfaces';
import { MainInterface } from '../../shared/models/main.interfaces';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  private gamesService = inject(GamesService);

  games = signal<MainInterface<Game> | null>(null);

  ngOnInit(): void {
    console.log('on init');
  }
}
