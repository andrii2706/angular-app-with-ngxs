import { Game } from '../../../shared/models/games.interfaces';
import { MainInterface } from './../../../shared/models/main.interfaces';
export class DefaultGamesAction {
  static readonly type = '[DefaultGames] Add item';
  constructor(readonly payload: any) {}
}

export class DefaultHomeGamesAction {
  static readonly type = '[Default Home Games] Add item';
  constructor(readonly resultsGames: MainInterface<Game>) {}
}
