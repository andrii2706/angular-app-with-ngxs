import { Component, input, OnInit, computed, inject, output } from '@angular/core';
import { Game } from '../../models/games.interfaces';
import { DatePipe, NgClass } from '@angular/common';
import { IconPipe } from '../../pipes/icon.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-card',
  imports: [DatePipe, NgClass, IconPipe, LucideAngularModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  game = input<Game>();
  changeStyle = input<boolean>();
  platforms = computed(() => this.game()?.platforms ?? []);
  genreInfo = output<string>();

  ngOnInit() {}

  genres(genre: string) {
    this.genreInfo.emit(genre);
  }
}
