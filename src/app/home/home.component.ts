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
      'url': 'simple-calculator',
      'icon': 'calculate',
      'path': undefined,
    },
    {
      'name': 'Testing Site',
      'url': 'testing-site',
      'icon': 'app_registration',
      'path': undefined,
    },
    {
      'name': 'Tell a joke',
      'url': '',
      'icon': 'theater_comedy',
      'path': undefined,
    },
    {
      'name': 'FLAMES',
      'url': 'flames',
      'icon': 'favorite',
      'path': undefined,
    },
    {
      'name': 'Digital Clock',
      'url': 'digital-clock',
      'icon': 'alarm',
      'path': undefined,
    },
    {
      'name': 'Pick a menu',
      'url': 'pick-a-menu',
      'icon': 'restaurant',
      'path': undefined,
    },
    {
      'name': 'Planning Poker',
      'url': 'planning-poker',
      'icon': 'svg',
      'path': 'svg/poker.svg',
    },
    {
      'name': 'AMB Calculator',
      'url': 'average-monthly-balance',
      'icon': 'svg',
      'path': 'svg/average.svg',
    },
    {
      'name': 'Nutrition Calculator',
      'url': 'nutrition-calculator',
      'icon': 'svg',
      'path': 'svg/NutritionCalculator.svg',
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
      if (name === 'Tell a joke') {
        this.getJoke();
        this.openDialog = true;
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
