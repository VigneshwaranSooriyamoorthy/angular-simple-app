import { Component } from '@angular/core';
import data from './data.json';
import { FormsModule } from '@angular/forms';

interface NutritionalValues {
  calories: string;
  carbohydrates: string;
  protein: string;
  fat: string;
  fiber: string;
}

interface FoodItemNutrition {
  food_item: string;
  serving_size: string;
  nutritional_values: NutritionalValues;
}

interface Unit {
  name: string;
  value: number[];
}


@Component({
  selector: 'app-nutrition-calculator',
  imports: [
    FormsModule,
  ],
  templateUrl: './nutrition-calculator.component.html',
  styleUrl: './nutrition-calculator.component.scss',
})
export class NutritionCalculatorComponent {
  foodItems: string[] = data.map((item: FoodItemNutrition) => item.food_item);
  units: Unit[] = [
    {
      name: 'number',
      value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      name: 'gram',
      value: [50, 100, 200, 250, 500],
    },
    {
      name: 'ml',
      value: [5, 10, 50, 100, 200, 250],
    },
  ];
  nutritionalValues: NutritionalValues | undefined;
  selectedUnit: string = '';
  valuesForSelectedUnit: number[] = [];
  selectedQuantity: number = 0;
  overallNutritionalValues: NutritionalValues[] = [];

  get_nutrition_values($event: Event) {
    const selectedFoodElement: HTMLSelectElement = $event.target as HTMLSelectElement;
    const selectedFood: string = selectedFoodElement.value;
    this.nutritionalValues = data.find((item: FoodItemNutrition) => item.food_item === selectedFood)?.nutritional_values;
    selectedFoodElement.blur();
  }

  updateSize($event: Event) {
    const selectedFoodElement: HTMLSelectElement = $event.target as HTMLSelectElement;
    selectedFoodElement.size = 5;
  }

  resetSize($event: Event) {
    const selectedFoodElement: HTMLSelectElement = $event.target as HTMLSelectElement;
    selectedFoodElement.size = 0;
  }

  updateUnitValues() {
    this.valuesForSelectedUnit = this.units.find(unit => unit.name === this.selectedUnit)?.value ?? [1];
  }

  updateTracker() {
    let multiplier: number = 1;
    switch (this.selectedUnit) {
      case 'number':
        multiplier = this.selectedQuantity;
        break;
      case 'gram':
        break;
      case 'ml':
        break;
    }
    if (this.nutritionalValues) {
      this.overallNutritionalValues?.push({
        calories: this.getOverallNutritionalValue(this.nutritionalValues.calories, multiplier),
        carbohydrates: this.getOverallNutritionalValue(this.nutritionalValues.carbohydrates, multiplier),
        protein: this.getOverallNutritionalValue(this.nutritionalValues.protein, multiplier),
        fat: this.getOverallNutritionalValue(this.nutritionalValues.fat, multiplier),
        fiber: this.getOverallNutritionalValue(this.nutritionalValues.fiber, multiplier),
      });
    }
    this.nutritionalValues = undefined;
  }

  getOverallNutritionalValue(nutritionalValue: string, quantity: number): string {
    const parsedNutritionalValue = nutritionalValue.split(' ');
    return `${(Number(parsedNutritionalValue[0]) * quantity).toFixed(2)} ${parsedNutritionalValue[1]}`;
  }
}
