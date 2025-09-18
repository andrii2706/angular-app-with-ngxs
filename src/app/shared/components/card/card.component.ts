import { Component, input, OnInit, computed } from '@angular/core';
import { Game, Platforms } from '../../models/games.interfaces';
import { DatePipe, NgClass } from '@angular/common';
import { IconPipe } from '../../pipes/icon.pipe';
import { platform } from 'os';

@Component({
  selector: 'app-card',
  imports: [DatePipe, NgClass, IconPipe],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  game = input<Game>();
  changeStyle = input<boolean>();
  platforms = computed(() => this.game()?.platforms ?? []);

  ngOnInit() {}

  genres() {
    console.log('genres');
  }
}
