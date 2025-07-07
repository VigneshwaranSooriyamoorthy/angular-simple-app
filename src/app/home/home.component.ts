import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { buttonType, DialogComponent } from '../util/dialog/dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    DialogComponent,
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  apps = [
    {
      'name': 'Simple Calculator',
      'icon': 'calculate',
      'url': 'simple-calculator',
      'path': undefined,
    },
    {
      'name': 'Testing Site',
      'icon': 'app_registration',
      'url': 'testing-site',
      'path': undefined,
    },
    {
      'name': 'Tell a joke',
      'icon': 'theater_comedy',
      'url': '',
      'path': undefined,
    },
    {
      'name': 'FLAMES',
      'icon': 'favorite',
      'url': 'flames',
      'path': undefined,
    },
    {
      'name': 'Digital Clock',
      'icon': 'alarm',
      'url': 'digital-clock',
      'path': undefined,
    },
    {
      'name': 'Pick a menu',
      'icon': 'restaurant',
      'url': 'pick-a-menu',
      'path': undefined,
    },
    {
      'name': 'Planning Poker',
      'icon': 'svg',
      'url': 'planning-poker',
      'path': 'svg/poker.svg',
    },
    {
      'name': 'AMB Calculator',
      'icon': 'svg',
      'url': 'average-monthly-balance',
      'path': 'svg/average.svg',
    },
  ];
  openDialog: boolean = false;
  joke: string = '';
  protected readonly buttonType = buttonType;

  getJoke() {
    fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            if (data.type === 'single') {
              this.joke = data.joke;
            } else {
              this.joke = `- ${data.setup}<br>- ${data.delivery}`;
            }
          });
        } else {
          alert('Joke API not working');
        }
      });
  }

  openApp(name: string, url: string) {
    if (url === '') {
      switch (name) {
        case 'Tell a joke':
          this.getJoke();
          this.openDialog = true;
          break;
      }
    } else {
      window.open(url, '_self');
    }
  }

  processDialogEvent($event: boolean) {
    if ($event) {
      this.getJoke();
    } else {
      this.joke = '';
      this.openDialog = false;
    }
  }

}
