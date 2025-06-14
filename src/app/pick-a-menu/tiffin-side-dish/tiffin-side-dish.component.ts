import { Component, EventEmitter, Output } from '@angular/core';
import * as dataTiffinSideDish from '../data/TiffinSideDish.json';

interface tiffinSideDish {
  Vegetable: string;
  Options: string[];
}

@Component({
  selector: 'app-tiffin-side-dish',
  imports: [],
  templateUrl: './tiffin-side-dish.component.html',
  standalone: true,
  styleUrl: './tiffin-side-dish.component.scss',
})
export class TiffinSideDishComponent {

  @Output() availableVeggies = new EventEmitter<string[]>();
  @Output() closeTiffinSection = new EventEmitter<boolean>();

  TIFFIN_SIDE_DISH: tiffinSideDish[] = (dataTiffinSideDish as any).default;
  AvailableVeggiesForTiffinSideDish: string[] = [];
  querySelectorVeggiesForTiffinSideDish: string = '.tiffin-side-dish .checkbox';

  setAvailableVegForChutney() {
    document.querySelectorAll(this.querySelectorVeggiesForTiffinSideDish)
      .forEach(veggie => {
        const inputVeggie = (<HTMLInputElement>veggie);
        if (inputVeggie.checked) {
          this.AvailableVeggiesForTiffinSideDish.push(inputVeggie.id);
        }
      });
    this.availableVeggies.emit(this.AvailableVeggiesForTiffinSideDish);
    this.closeTiffinSection.emit(true);
  }

  selectAllCheckboxes(checked: boolean) {
    document.querySelectorAll(this.querySelectorVeggiesForTiffinSideDish)
      .forEach(veggie => (<HTMLInputElement>veggie).checked = checked);
  }

  updateSelectAll() {
    const cbSelectAll = (<HTMLInputElement>document.querySelector('.select-all-checkbox .checkbox'));
    const cbVeggies = Array.from(document.querySelectorAll(this.querySelectorVeggiesForTiffinSideDish));
    if (cbVeggies.every(cbVeggie => (<HTMLInputElement>cbVeggie).checked)) {
      cbSelectAll.indeterminate = false;
      cbSelectAll.checked = true;
    } else if (cbVeggies.every(cbVeggie => !(<HTMLInputElement>cbVeggie).checked)) {
      cbSelectAll.indeterminate = false;
      cbSelectAll.checked = false;
    } else if (cbVeggies.some(cbVeggie => (<HTMLInputElement>cbVeggie).checked)) {
      cbSelectAll.indeterminate = true;
    }
  }

}
