import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SimpleCalculatorComponent} from './simple-calculator/simple-calculator.component';
import {TestingSiteComponent} from './testing-site/testing-site.component';
import {FlamesComponent} from './flames/flames.component';
import {DigitalClockComponent} from './digital-clock/digital-clock.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'simple-calculator', component: SimpleCalculatorComponent},
  {path: 'testing-site', component: TestingSiteComponent},
  {path: 'flames', component: FlamesComponent},
  {path: 'digital-clock', component: DigitalClockComponent}
];
