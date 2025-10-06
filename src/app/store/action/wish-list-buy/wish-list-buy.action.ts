import { Game } from '../../../shared/models/games.interfaces';

export class AddToWishList {
  static readonly type = '[Games] Add To Wishlist';
  constructor(public game: Game) {}
}

export class RemoveFromWishList {
  static readonly type = '[Games] Remove From Wishlist';
  constructor(public gameId: number) {}
}

export class BuyGame {
  static readonly type = '[Games] Buy Game';
  constructor(public gameId: number) {}
}
