import { DestroyRef, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { DevelopersService } from '../../services/developers/developers.service';
import { finalize, tap } from 'rxjs';
import { setLoaderStatusAction } from '../../../store/action/loader/loader.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MainInterface } from '../../models/main.interfaces';
import { Developers } from '../../models/developers.interface';

export const developersResolver: ResolveFn<MainInterface<Developers>> = (route, state) => {
  const store = inject(Store);
  const developersService = inject(DevelopersService);
  const destroyRef = inject(DestroyRef);

  return developersService.getDevelopers(1).pipe(
    tap((games) => {
      developersService.developers.set(games);
      developersService.defaultDevelopers.set(games);
    }),
    finalize(() => store.dispatch(new setLoaderStatusAction(false))),
    takeUntilDestroyed(destroyRef)
  );
};
