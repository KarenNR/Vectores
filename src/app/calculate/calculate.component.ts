import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {

  // Component Form
  ComponentForm!: FormGroup;
  componentX!: FormControl;
  componentY!: FormControl;
  degree!: FormControl;
  magnitude!: FormControl;

  // Sum Form
  SumForm!: FormGroup;
  magnitudeA!: FormControl;
  directionA!: FormControl;
  magnitudeB!: FormControl;
  directionB!: FormControl;
  magnitudeC!: FormControl;
  directionC!: FormControl;

  // Sum variables
  resultSum: boolean = false;
  rx!: number;
  ry!: number;
  r!: number;
  rtheta!: number;

  constructor( 
    private _notifyService : NotificationService
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    // Component Form
    this.componentX = new FormControl('', { updateOn: 'change' });
    this.componentY = new FormControl('', { updateOn: 'change' });
    this.degree = new FormControl('', { updateOn: 'change' });
    this.magnitude = new FormControl('', { updateOn: 'change' });
    // Sum Form
    this.magnitudeA = new FormControl('', { updateOn: 'change' });
    this.directionA = new FormControl('', { updateOn: 'change' });
    this.magnitudeB = new FormControl('', { updateOn: 'change' });
    this.directionB = new FormControl('', { updateOn: 'change' });
    this.magnitudeC = new FormControl('', { updateOn: 'change' });
    this.directionC = new FormControl('', { updateOn: 'change' });
  }

  private createForm(): void {
    this.ComponentForm = new FormGroup({
      'componentX': this.componentX,
      'componentY': this.componentY,
      'degree': this.degree,
      'magnitude': this.magnitude
    });
    this.SumForm = new FormGroup({
      'magnitudeA': this.magnitudeA,
      'directionA': this.directionA,
      'magnitudeB': this.magnitudeB,
      'directionB': this.directionB,
      'magnitudeC': this.magnitudeC,
      'directionC': this.directionC
    })
  }

  calculateComponents() {
    let aux = 0;
    // Check if fields are empty
    let emptyX = this.componentX.value == '' || this.componentX.value == null ? true : false;
    let emptyY = this.componentY.value == '' || this.componentY.value == null ? true : false;
    let emptyD = this.degree.value == '' || this.degree.value == null ? true : false;
    let emptyM = this.magnitude.value == '' || this.magnitude.value == null ? true : false;
    // Elements that were taken into account
    let element1 = '';
    let element2 = '';
    // Calculate components X and Y from magnitude and degrees
    if (!emptyM && !emptyD) {
      this.componentX.setValue( this.round2Decimals(this.magnitude.value * Math.cos(this.degree.value*Math.PI/180)) );
      this.componentY.setValue( this.round2Decimals(this.magnitude.value * Math.sin(this.degree.value*Math.PI/180)) );
      element1 = "Magnitud";
      element2 = "Grados";
    }
    // Calculate degrees and magnitude from components X and Y
    else if (!emptyX && !emptyY) {
      this.magnitude.setValue( this.round2Decimals(Math.sqrt(Math.pow(this.componentX.value,2) + Math.pow(this.componentY.value,2))) );
      this.degree.setValue( this.convertDegree( this.componentX.value, this.componentY.value, this.round2Decimals(Math.atan(this.componentY.value / this.componentX.value)*180/Math.PI) ) );
      element1 = "Componente X";
      element2 = "Componente Y";
    }
    // Calculate component X and degree from magnitude and component Y
    else if (!emptyY && !emptyM) {
      aux = Math.sqrt(Math.pow(this.magnitude.value,2) - Math.pow(this.componentY.value,2))
      this.componentX.setValue( this.round2Decimals(aux) );
      this.degree.setValue( this.convertDegree( this.componentX.value, this.componentY.value, this.round2Decimals(Math.atan(this.componentY.value / aux)*180/Math.PI) ) );
      element1 = "Magnitud";
      element2 = "Componente Y";
    }
    // Calculate component X and magnitude from degrees and component Y
    else if (!emptyY && !emptyD) {
      aux = this.componentY.value/Math.tan(this.degree.value*Math.PI/180)
      this.componentX.setValue( this.round2Decimals(aux) );
      this.magnitude.setValue( this.round2Decimals(Math.sqrt(Math.pow(aux,2) + Math.pow(this.componentY.value,2))) );
      element1 = "Grados";
      element2 = "Componente Y";
    }
    // Calculate component Y and degree from magnitude and component X
    else if (!emptyX && !emptyM) {
      aux = Math.sqrt(Math.pow(this.magnitude.value,2) - Math.pow(this.componentX.value,2))
      this.componentY.setValue( this.round2Decimals(aux) );
      this.degree.setValue( this.convertDegree( this.componentX.value, this.componentY.value, this.round2Decimals(Math.atan(aux / this.componentX.value)*180/Math.PI) ) );
      element1 = "Magnitud";
      element2 = "Componente X";
    }
    // Calculate component Y and magnitude from degrees and component X
    else if (!emptyX && !emptyD) {
      aux = this.componentX.value*Math.tan(this.degree.value*Math.PI/180)
      this.componentY.setValue( this.round2Decimals(aux) );
      this.magnitude.setValue( this.round2Decimals(Math.sqrt(Math.pow(this.componentX.value,2) + Math.pow(aux,2))) );
      element1 = "Grados";
      element2 = "Componente X";
    }
    else {
      this._notifyService.showError("No tengo elementos suficientes para hacer los cálculos", "¡Ups!");
    }
    // Notify user which elements were taken into account in case all fields were full
    if (!emptyX && !emptyY && !emptyD && !emptyM) {
      this._notifyService.showInfo("Tomé en cuenta " + element1 + " y " + element2 + " para hacer los cálculos", "Nota")
    }
  }

  calculateSum() {
    // Check if fields are empty
    let emptyA = this.magnitudeA.value === '' || this.magnitudeA.value === null || this.directionA.value === '' || this.directionA.value === null ? true : false;
    let emptyB = this.magnitudeB.value === '' || this.magnitudeB.value === null || this.directionB.value === '' || this.directionB.value === null ? true : false;
    let emptyC = this.magnitudeC.value === '' || this.magnitudeC.value === null || this.directionC.value === '' || this.directionC.value === null ? true : false;
    // All fields are empty
    if (emptyA && emptyB && emptyC) {
      this._notifyService.showError("No tengo elementos suficientes para hacer los cálculos", "¡Ups!");
    }
    else {
      // Resultant components
      let resultantX = 0;
      let resultantY = 0;
      // Sum individual components
      if (!emptyA) {
        resultantX += this.magnitudeA.value * Math.cos(this.directionA.value*Math.PI/180);
        resultantY += this.magnitudeA.value * Math.sin(this.directionA.value*Math.PI/180);
      }
      if (!emptyB) {
        resultantX += this.magnitudeB.value * Math.cos(this.directionB.value*Math.PI/180);
        resultantY += this.magnitudeB.value * Math.sin(this.directionB.value*Math.PI/180);
      }
      if (!emptyC) {
        resultantX += this.magnitudeC.value * Math.cos(this.directionC.value*Math.PI/180);
        resultantY += this.magnitudeC.value * Math.sin(this.directionC.value*Math.PI/180);
      }
      // Results
      this.resultSum = true;
      this.rx = this.round2Decimals(resultantX);
      this.ry = this.round2Decimals(resultantY);
      this.r = this.round2Decimals( Math.sqrt(Math.pow(resultantX,2) + Math.pow(resultantY,2)) );
      this.rtheta = this.convertDegree( resultantX, resultantY, this.round2Decimals( Math.atan(resultantY / resultantX)*180/Math.PI ) );
    }
  }

  round2Decimals(x: number): number {
    return Math.round(x * 100) / 100;
  }

  convertDegree(componentX: number, componentY: number, degree: number): number {
    // I
    if (componentX >= 0 && componentY >= 0) 
      return degree;
    // II
    else if (componentX < 0 && componentY >= 0)
      return degree + 180;
    // III
    else if (componentX < 0 && componentY < 0)
      return degree + 180;
    // IV
    else if (componentX >= 0 && componentY < 0)
      return degree + 360;
    else
      return degree;
  }
}
