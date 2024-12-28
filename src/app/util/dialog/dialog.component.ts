import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgIf} from '@angular/common';

export enum buttonType {
  ONLY_PRIMARY_BUTTON,
  PRIMARY_AND_SECONDARY_BUTTONS
}

@Component({
  selector: 'app-dialog',
  imports: [
    NgIf
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {

  @Input() message: string = '';
  @Input() buttonType: buttonType = buttonType.ONLY_PRIMARY_BUTTON;
  @Input() primaryButtonVisibleText: string = '';
  onlyPrimaryButton: boolean = false;
  primarySecondaryButton: boolean = false;
  @Output() sender = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.buttonType === buttonType.ONLY_PRIMARY_BUTTON) {
      this.onlyPrimaryButton = true;
    } else {
      this.primarySecondaryButton = true;
    }
  }

}
