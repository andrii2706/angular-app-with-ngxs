import {
  Component,
  computed,
  DestroyRef,
  effect,
  HostListener,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, finalize, take } from 'rxjs';
import { FilterOptionsState } from '../../store/states/filter-options/filter-options.state';
import { FilterParams } from '../../shared/models/filter.interfaces';
import { MainInterface } from '../../shared/models/main.interfaces';
import { Game } from '../../shared/models/games.interfaces';
import { GamesService } from '../../shared/services/games/games.service';
import { Store } from '@ngxs/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgClass } from '@angular/common';
import { setLoaderStatusAction } from '../../store/action/loader/loader.actions';

@Component({
  selector: 'app-games',
  imports: [NgClass, CardComponent, NgxPaginationModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  standalone: true,
})
export class GamesComponent implements OnInit {
  private store = inject(Store);
  private gamesService = inject(GamesService);
  private injector = inject(Injector);
  private destroyRed = inject(DestroyRef);

  games = signal<MainInterface<Game> | null>(null);
  gamesList = computed(() => this.games()?.results ?? []);
  filterOptions = signal<FilterParams | null>(null);
  filterInfo = computed(() => this.filterOptions() ?? this.defaultValue);

  activeGrid: boolean = true;
  activeCollomn: boolean = false;
  showAndHideDesign: boolean = true;
  cardSkeleton: boolean = false;
  firstYearDay = new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  lastYearDay = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];
  page: number = 1;
  defaultValue = {
    search: '',
    platforms: '',
    ordering: '',
    metacritic: '',
    developers: '',
    tags: '',
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.showAndHideDesign = (event.target as Window).innerWidth > 1024;
  }

  ngOnInit(): void {
    this.showAndHideDesign = window.innerWidth > 1024;
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.games.set(this.gamesService.games());
      });
      this.store
        .select(FilterOptionsState.getState)
        .pipe(
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
          debounceTime(300),
          takeUntilDestroyed(this.destroyRed)
        )
        .subscribe((filterOptions) => {
          this.filterOptions.set(filterOptions);
          if (JSON.stringify(this.filterOptions()) !== JSON.stringify(this.defaultValue)) {
            this.getFilteredGames();
          } else {
            this.returnToDefault();
          }
        });
    });
  }

  getFilteredGames() {
    this.gamesService
      .filterGames(1, this.filterInfo())
      .pipe(
        debounceTime(800),
        take(1),
        finalize(() => (this.cardSkeleton = false))
      )
      .subscribe((games) => {
        this.gamesService.homeGames.set(games);
      });
  }

  getGenreForRequest(genre: string) {
    this.store.dispatch(new setLoaderStatusAction(true));
    this.gamesService
      .getGamesWithGenres(1, genre)
      .pipe(
        take(1),
        finalize(() => this.store.dispatch(new setLoaderStatusAction(false)))
      )
      .subscribe((gamesGenres) => {
        this.gamesService.games.set(gamesGenres);
      });
  }

  navigateTo(PageNumber: number) {
    this.page = PageNumber;
    // this.getNewGames(PageNumber);
  }

  returnToDefault() {
    this.gamesService.games.set(this.gamesService.defaultGames());
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
