import { Component, input, computed, inject, output, ChangeDetectionStrategy } from '@angular/core';
import { Game } from '../../models/games.interfaces';
import { DatePipe, NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { GamesService } from '../../services/games/games.service';
import { GamesStatusEnum } from '../../enums/games-status.enum';
import { Store } from '@ngxs/store';
import { AddToWishList } from '../../../store/action/wish-list-buy/wish-list-buy.action';
import { imgEmptyView } from '../../constants/main.constants';

@Component({
  selector: 'app-card',
  imports: [DatePipe, NgClass, LucideAngularModule],
  standalone: true,
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private route = inject(Router);
  private gamesService = inject(GamesService);
  private store = inject(Store);

  private readonly maxVisibleGenres = 3;
  readonly imgEmptyView = imgEmptyView;

  game = input<Game>();
  changeStyle = input<boolean>();
  genreInfo = output<string>();
  skeleton = input<boolean>();
  imgChanges = input<boolean>();

  platforms = computed(() => this.game()?.platforms ?? []);

  visibleGenres = computed(() => this.game()?.genres?.slice(0, this.maxVisibleGenres) ?? []);

  extraGenresCount = computed(() => {
    const total = this.game()?.genres?.length ?? 0;
    return Math.max(0, total - this.maxVisibleGenres);
  });

  hiddenGenresTitle = computed(
    () =>
      this.game()
        ?.genres?.slice(this.maxVisibleGenres)
        .map((g) => g.name)
        .join(', ') ?? ''
  );

  genres(genre: string) {
    this.genreInfo.emit(genre);
  }

  goToDetails(id: number | undefined) {
    if (id) this.route.navigate([`/games/${id}`]);
  }

  addToWishList(game: Game | undefined) {
    if (game) {
      game.isBought = true;
      game.statusOfGame = GamesStatusEnum.WISH_LIST_ADD_STATUS;
      this.gamesService.saveGames(game);
      this.store.dispatch(new AddToWishList(game));
    }
  }
}
