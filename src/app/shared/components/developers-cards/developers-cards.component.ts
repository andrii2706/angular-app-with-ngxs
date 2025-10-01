import { Component, computed, input, output } from '@angular/core';
import { Developers } from '../../models/developers.interface';

@Component({
  selector: 'app-developers-cards',
  imports: [],
  templateUrl: './developers-cards.component.html',
  styleUrl: './developers-cards.component.scss',
})
export class DevelopersCardsComponent {
  developers = input<Developers>();
  changeStyle = input<boolean>();
  genreInfo = output<string>();
  skeleton = input<boolean>();

  ngOnInit() {}

  genres(genre: string) {
    this.genreInfo.emit(genre);
  }

  addToWishList(game: Developers | undefined) {
    console.log(game);
  }
}
