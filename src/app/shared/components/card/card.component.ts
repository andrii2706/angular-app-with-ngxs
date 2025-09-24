import { Component, input, OnInit, computed, inject } from '@angular/core';
import { Game } from '../../models/games.interfaces';
import { DatePipe, NgClass } from '@angular/common';
import { IconPipe } from '../../pipes/icon.pipe';
import { LucideAngularModule } from 'lucide-angular';
import { Store } from '@ngxs/store';
import { setSnackbarSuccessShowAction } from '../../../store/action/snackbar/snackbar.actions';

@Component({
  selector: 'app-card',
  imports: [DatePipe, NgClass, IconPipe, LucideAngularModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  private store = inject(Store);
  game = input<Game>();
  changeStyle = input<boolean>();
  platforms = computed(() => this.game()?.platforms ?? []);

  ngOnInit() {}

  genres() {
    this.store.dispatch(new setSnackbarSuccessShowAction(true, 'You Are Loggined Success fully'));
    setTimeout(() => {
      // this.store.dispatch(new setSnackbarSuccessShowAction(false, ''));
    }, 3000);
  }
}
