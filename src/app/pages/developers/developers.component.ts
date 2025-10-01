import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { DevelopersService } from '../../shared/services/developers/developers.service';
import { Store } from '@ngxs/store';
import { MainInterface } from '../../shared/models/main.interfaces';
import { Developers } from '../../shared/models/developers.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { DevelopersCardsComponent } from '../../shared/components/developers-cards/developers-cards.component';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-developers',
  imports: [NgxPaginationModule, DevelopersCardsComponent],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.scss',
})
export class DevelopersComponent implements OnInit {
  private store = inject(Store);
  private developerService = inject(DevelopersService);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  page: number = 1;
  cardSkeleton: boolean = false;

  developers = signal<MainInterface<Developers> | null>(null);
  developersInfo = computed(() => this.developers()?.results ?? []);

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.developers.set(this.developerService.developers());
      });
    });
  }

  navigateTo(page: number) {
    this.cardSkeleton = true;
    this.developerService
      .getDevelopers(page)
      .pipe(
        finalize(() => (this.cardSkeleton = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((developers) => {
        this.developers.set(developers);
      });
  }
}
