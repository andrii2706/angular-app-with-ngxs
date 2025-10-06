import {
  Component,
  effect,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { GamesService } from '../../../../shared/services/games/games.service';
import { GameDetails } from '../../../../shared/models/games.interfaces';

@Component({
  selector: 'app-game-details',
  imports: [],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss',
  standalone: true,
})
export class GameDetailsComponent implements OnInit {
  private injector = inject(Injector);
  private gamesService = inject(GamesService);

  gameByIdInfo = signal<GameDetails | null>(null);

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {});
    });
    this.gameByIdInfo.set(this.gamesService.gameById());
  }
}
