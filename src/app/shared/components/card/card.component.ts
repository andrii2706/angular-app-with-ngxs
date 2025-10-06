import { Component, input, computed, inject, output } from '@angular/core';
import { Game } from '../../models/games.interfaces';
import { DatePipe, NgClass } from '@angular/common';
import { IconPipe } from '../../pipes/icon.pipe';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { GamesService } from '../../services/games/games.service';
import { GamesStatusEnum } from '../../enums/games-status.enum';
import { Store } from '@ngxs/store';
import { AddToWishList } from '../../../store/action/wish-list-buy/wish-list-buy.action';

@Component({
  selector: 'app-card',
  imports: [DatePipe, NgClass, IconPipe, LucideAngularModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private route = inject(Router);
  private gamesService = inject(GamesService);
  private store = inject(Store);

  game = input<Game>();
  changeStyle = input<boolean>();
  genreInfo = output<string>();
  skeleton = input<boolean>();

  platforms = computed(() => this.game()?.platforms ?? []);

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
