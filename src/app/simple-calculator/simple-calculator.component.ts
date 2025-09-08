import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-simple-calculator',
  templateUrl: './simple-calculator.component.html',
  styleUrl: './simple-calculator.component.scss',
  standalone: true,
})
export class SimpleCalculatorComponent {
  buttons = ['7', '8', '9', '+/-', '⌫', '4', '5', '6', '*', '/', '1', '2', '3', '-', '=', 'C', '0', '.', '+'];
  operators = ['+', '-', '*', '/', '='];
  entry: string = '';
  result: string = '';
  value1: number = 0;
  value2: number = 0;
  currentOperator = '';

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent($event: KeyboardEvent) {
    if (this.buttons.includes($event.key)) {
      this.compute($event.key);
    } else if ($event.key === 'Enter') {
      this.compute('=');
    } else if ($event.key === 'Escape') {
      this.compute('C');
    } else if ($event.key === 'Backspace') {
      this.compute('⌫');
    }
  }

  reset() {
    this.entry = '';
    this.result = '';
    this.value1 = 0;
    this.value2 = 0;
    this.currentOperator = '';
  }

  compute(button: string) {

    // Calculator reset button
    if (button === 'C') {
      this.reset();
      return;
    }

    // Remove last character
    if (button === '⌫') {
      this.entry = this.entry.slice(0, -1);
      return;
    }

    // When an operator is selected
    if (this.operators.includes(button)) {

      // Skip computation if same operator pressed multiple times
      if (button === this.entry.at(-2)) {
        return;
      }

      // Check operator pressed multiple times, if so go with the last pressed operator
      if (this.operators.includes(<string>this.entry.at(-2))) {
        this.entry = `${this.entry.slice(0, -2)} ${button} `;
        this.currentOperator = button;
        return;
      }

      // Check whether the operator is second operator
      if (this.operators.includes(this.currentOperator)) {
        this.value2 = Number(this.entry.split(` ${this.currentOperator} `).at(-1));
        let result = 0;
        switch (this.currentOperator) {
          case '+':
            result = this.value1 + this.value2;
            break;
          case '-':
            result = this.value1 - this.value2;
            break;
          case '*':
            result = this.value1 * this.value2;
            break;
          case '/':
            result = this.value1 / this.value2;
            break;
          default:
            break;
        }
        this.value1 = result;
        this.value2 = 0;
        this.result = parseFloat(result.toFixed(4)).toString();
      } else {
        this.value1 = Number(this.entry);
      }
      this.currentOperator = button;
      if (this.currentOperator !== '=') {
        this.entry += ` ${button} `;
      }
    } else {
      if (this.currentOperator === '=') {
        this.reset();
      }
      this.entry += button;
    }
  }
}
