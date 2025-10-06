import { Injectable } from '@angular/core';
import {
  Action,
  NgxsAfterBootstrap,
  NgxsOnChanges,
  NgxsOnInit,
  NgxsSimpleChange,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import {
  AddToWishList,
  BuyGame,
  RemoveFromWishList,
} from '../../action/wish-list-buy/wish-list-buy.action';
import { Game } from '../../../shared/models/games.interfaces';
import { GamesStatusEnum } from '../../../shared/enums/games-status.enum';

export interface GameWithStatus {
  game: Game;
  status: GamesStatusEnum;
}
export interface GamesStateModel {
  games: GameWithStatus[];
}

@State<GamesStateModel>({
  name: 'games',
  defaults: {
    games: [],
  },
})
@Injectable()
export class GamesStatusState implements NgxsOnInit, NgxsAfterBootstrap, NgxsOnChanges {
  @Selector()
  static wishList(state: GamesStateModel) {
    return state.games.filter((g) => g.status === GamesStatusEnum.WISH_LIST_ADD_STATUS);
  }

  @Selector()
  static boughtGames(state: GamesStateModel) {
    return state.games.filter((g) => g.status === GamesStatusEnum.BOTHED_GAME);
  }

  ngxsOnInit(ctx: StateContext<GamesStateModel>): void {
    console.log('[NGXS] GamesState initialized', ctx.getState());
    const saved = localStorage.getItem('games');
    if (saved) {
      ctx.patchState({ games: JSON.parse(saved) });
    }
  }

  ngxsAfterBootstrap(ctx: StateContext<GamesStateModel>): void {
    console.log('[NGXS] GamesState after Angular bootstrap');
    // ctx.patchState({ games: fetchedGames });
  }

  ngxsOnChanges(change: NgxsSimpleChange<GamesStateModel>): void {
    console.log('[NGXS] GamesState changed', change);
    localStorage.setItem('games', JSON.stringify(change.currentValue.games));
  }

  @Action(AddToWishList)
  addToWishList(ctx: StateContext<GamesStateModel>, { game }: AddToWishList) {
    const state = ctx.getState();

    if (!state.games.find((g) => g.game.id === game.id)) {
      ctx.patchState({
        games: [...state.games, { game, status: GamesStatusEnum.WISH_LIST_ADD_STATUS }],
      });
    } else {
      ctx.patchState({
        games: state.games.map((g) =>
          g.game.id === game.id ? { ...g, status: GamesStatusEnum.WISH_LIST_ADD_STATUS } : g
        ),
      });
    }
  }

  @Action(RemoveFromWishList)
  removeFromWishList(ctx: StateContext<GamesStateModel>, { gameId }: RemoveFromWishList) {
    const state = ctx.getState();
    ctx.patchState({
      games: state.games.map((g) =>
        g.game.id === gameId ? { ...g, status: GamesStatusEnum.WISH_LIST_REMOVE_STATUS } : g
      ),
    });
  }

  @Action(BuyGame)
  buyGame(ctx: StateContext<GamesStateModel>, { gameId }: BuyGame) {
    const state = ctx.getState();
    ctx.patchState({
      games: state.games.map((g) =>
        g.game.id === gameId ? { ...g, status: GamesStatusEnum.BOTHED_GAME } : g
      ),
    });
  }
}
