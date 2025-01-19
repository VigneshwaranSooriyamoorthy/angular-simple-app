import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {buttonType, DialogComponent} from '../util/dialog/dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    FormsModule,
    DialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  apps = [
    {
      'name': 'Simple Calculator',
      'icon': 'calculate',
      'url': 'simple-calculator',
    },
    {
      'name': 'Testing Site',
      'icon': 'app_registration',
      'url': 'testing-site'
    },
    {
      'name': 'Tell a joke',
      'icon': 'theater_comedy',
      'url': ''
    },
    {
      'name': 'FLAMES',
      'icon': 'favorite',
      'url': 'flames'
    },
    {
      'name': 'Digital Clock',
      'icon': 'alarm',
      'url': 'digital-clock',
    }
  ];
  openDialog: boolean = false;
  joke: string = '';
  protected readonly buttonType = buttonType;
  openClockDialog: boolean = false;

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
          })
        } else {
          alert('Joke API not working')
        }
      })
  }

  openApp(name:string, url: string) {
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
