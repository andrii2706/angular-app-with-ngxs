import {
  Component,
  DestroyRef,
  effect,
  HostListener,
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
import { CardComponent } from '../../shared/components/card/card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../store/action/loader/loader.actions';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [NgClass, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  private gamesService = inject(GamesService);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  games = signal<MainInterface<Game> | null>(null);

  activeGrid: boolean = true;
  activeCollomn: boolean = false;
  showAndHideDesign: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.showAndHideDesign = (event.target as Window).innerWidth > 1024;
  }

  ngOnInit(): void {
    this.showAndHideDesign = window.innerWidth > 1024;
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.games.set(this.gamesService.homeGames());
      });
    });
  }
  getGenreForRequest(genre: string) {
    this.store.dispatch(new setLoaderStatusAction(true));
    this.gamesService
      .getGamesByGenres(1, genre)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.store.dispatch(new setLoaderStatusAction(false)))
      )
      .subscribe((gamesGenres) => {
        this.games.set(gamesGenres);
      });
  }

  returnToDefault() {
    this.games.set(this.gamesService.homeGames());
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
