import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AlphaCorporation';
  cards = [
    {
      'name': 'Elements',
      'icon': 'menu'
    },
    {
      'name': 'Forms',
      'icon': 'list_alt'
    },
    {
      'name': 'Alerts, Frame & Windows',
      'icon': 'tab'
    },
    {
      'name': 'Widgets',
      'icon': 'widgets'
    },
    {
      'name': 'Interactions',
      'icon': 'repeat_on'
    },
    {
      'name': 'Book Store Application',
      'icon': 'library_books'
    }
  ]
}
