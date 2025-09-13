import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';

export interface CreatorsStateModel {
    items: string[];
}

@State<CreatorsStateModel>({
    name: 'creators',
    defaults: {
        items: []
    }
})
@Injectable()
export class CreatorsState {

    @Selector()
    static getState(state: CreatorsStateModel) {
        return state;
    }

}
