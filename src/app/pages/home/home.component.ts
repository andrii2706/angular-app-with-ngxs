import {
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { GamesService } from '../../shared/services/games/games.service';
import { Game } from '../../shared/models/games.interfaces';
import { MainInterface } from '../../shared/models/main.interfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  private gamesService = inject(GamesService);
  private injector = inject(Injector);

  games = signal<MainInterface<Game> | null>(null);

  activeGrid: boolean = true;
  activeCollomn: boolean = false;

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.games.set(this.gamesService.games());
        console.log(this.games());
      });
    });
  }

  activeGridButton() {
    this.activeGrid = true;
    this.activeCollomn = false;
  }

  activeCollomnButton() {
    this.activeGrid = false;
    this.activeCollomn = true;
  }
}
