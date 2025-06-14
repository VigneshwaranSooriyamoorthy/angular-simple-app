import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TiffinSideDishComponent } from './tiffin-side-dish/tiffin-side-dish.component';
import { getRandomValue } from '../../../public/util/ArrayUtil';
import * as dataTiffinSideDish from './data/TiffinSideDish.json';

interface food {
  type: string;
  category: string;
  name: string[];
}

interface tiffinSideDish {
  Vegetable: string;
  Options: string[];
}

@Component({
  selector: 'app-pick-a-menu',
  imports: [
    FormsModule,
    TiffinSideDishComponent,
  ],
  templateUrl: './pick-a-menu.component.html',
  standalone: true,
  styleUrl: './pick-a-menu.component.scss',
})
export class PickAMenuComponent {

  chooseWhat: string[] = ['', 'TIFFIN SIDE DISH', 'VEGETARIAN MEAL', 'NON VEGETARIAN MEAL'];
  requestedSuggestion: string = '';
  isVegetarian: boolean = false;
  isNonVegetarian: boolean = false;

  // TIFFIN SIDE DISH
  isTiffinSideDish: boolean = false;
  AvailableVeggiesForTiffinSideDish: string[] = [];
  tiffinSideDishSuggestion = {
    Vegetable: '',
    SideDish: '',
  };

  VEGETABLE: string[] = [
    'Kovaikkai',
    'Avaraikkai',
    'Suraikkai',
    'Keerai',
    'Peerkankai',
    'Pudalankai',
    'Vendakkai',
  ];

  MEAT: string[] = [
    'Chicken',
    'Mutton',
    'Fish',
    'Squid',
    'Prawn',
  ];

  menu: food[] = [
    {
      type: 'Vegetarian',
      category: 'Main Course',
      name: [
        'Rice',
        'Briyani',
      ],
    },
    {
      type: 'Vegetarian',
      category: 'Gravy',
      name: [
        'Sambar',
        'Puli Kulambu',
        'Mor Kulambu',
        'Koottu',
      ],
    },
    {
      type: 'Vegetarian',
      category: 'Side dish',
      name: [
        'Poriyal',
        '65',
        'Munchurian',
        'Appalam',
        'Vathal',
      ],
    },
    {
      type: 'Non Vegetarian',
      category: 'Main Course',
      name: [
        'Rice',
        'Briyani',
      ],
    },
    {
      type: 'Non Vegetarian',
      category: 'Side dish',
      name: [
        'Varuval',
        '65',
        'Munchurian',
        'Pepper Fry',
      ],
    },
    {
      type: 'Non Vegetarian',
      category: 'Gravy',
      name: [
        'Kulambu',
      ],
    },
  ];

  removeSuggestionSection() {
    this.isTiffinSideDish = this.isVegetarian = this.isNonVegetarian = false;
    this.AvailableVeggiesForTiffinSideDish = [];
  }

  onRequestSuggestion() {
    this.removeSuggestionSection();
    switch (this.requestedSuggestion) {
      case 'TIFFIN SIDE DISH':
        this.isTiffinSideDish = true;
        break;
      case 'VEGETARIAN':
        this.isVegetarian = true;
        break;
      case 'NON VEGETARIAN':
        this.isNonVegetarian = true;
        break;
      default:
        break;
    }
  }

  setCategory(category: string) {
    this.requestedSuggestion = category;
    this.removeSuggestionSection();
  }

  computeTiffinSideDishSuggestion() {
    const TIFFIN_SIDE_DISH: tiffinSideDish[] = (dataTiffinSideDish as any).default;
    const suggestion: tiffinSideDish[] = TIFFIN_SIDE_DISH.filter(chutney => this.AvailableVeggiesForTiffinSideDish.includes(chutney.Vegetable));
    const randomTiffinSideDish: tiffinSideDish = getRandomValue(suggestion);
    this.tiffinSideDishSuggestion.Vegetable = randomTiffinSideDish.Vegetable;
    this.tiffinSideDishSuggestion.SideDish = getRandomValue(randomTiffinSideDish.Options);
  }

  tearDownTiffinSection($event: boolean) {
    this.isTiffinSideDish = !$event;
    this.computeTiffinSideDishSuggestion();
  }

  protected readonly getRandomValue = getRandomValue;
}
