import { NgxPaginationModule } from 'ngx-pagination';
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
import { GamesService } from '../../shared/services/games/games.service';
import { Game } from '../../shared/models/games.interfaces';
import { MainInterface } from '../../shared/models/main.interfaces';
import { JsonPipe, NgClass } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxsOnChanges, NgxsSimpleChange, Store } from '@ngxs/store';
import { setLoaderStatusAction } from '../../store/action/loader/loader.actions';
import { debounceTime, distinctUntilChanged, finalize, map, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterOptionsState } from '../../store/states/filter-options/filter-options.state';
import { FilterParams } from '../../shared/models/filter.interfaces';

@Component({
  selector: 'app-home',
  imports: [NgClass, CardComponent, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
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
        this.games.set(this.gamesService.homeGames());
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
        this.gamesService.homeGames.set(gamesGenres);
      });
  }

  getNewGames(page: number) {
    this.cardSkeleton = true;
    if (this.filterOptions() === null || this.filterInfo()) {
      this.getLastReleasedGamesInfo();
    } else {
      this.getFilteredGames();
    }
  }

  getLastReleasedGamesInfo() {
    const firstYearDay = this.firstYearDay;
    const lastYearDay = this.lastYearDay;
    const dates = `${firstYearDay},${lastYearDay}`;
    this.gamesService
      .getLastReleasedGames(1, dates)
      .pipe(
        debounceTime(800),
        takeUntilDestroyed(this.destroyRed),
        finalize(() => (this.cardSkeleton = false))
      )
      .subscribe((games) => {
        this.gamesService.homeGames.set(games);
      });
  }

  navigateTo(PageNumber: number) {
    this.page = PageNumber;
    this.getNewGames(PageNumber);
  }

  returnToDefault() {
    this.gamesService.homeGames.set(this.gamesService.defaultGames());
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
