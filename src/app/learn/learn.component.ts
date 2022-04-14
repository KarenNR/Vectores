import { CommutativeComponent } from './../dialogs/commutative/commutative.component';
import { NegativeComponent } from './../dialogs/negative/negative.component';
import { AssociativeComponent } from './../dialogs/associative/associative.component';
import { EqualityComponent } from './../dialogs/equality/equality.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  /* FORMULAS */

  // Components
  xComponent = "$Ax = A\\cos\\theta$";
  yComponent = "$Ay = A\\sin\\theta$";
  xComponentSubstitution = "$Ax = 100m\\cos{30}$";
  xComponentResult = "$Ax = 86.60m$"
  yComponentSubstitution = "$Ay = 100m\\sin{30}$";
  yComponentResult = "$Ax = 50m$";

  // Magnitude and direction
  magnitude = "$A = \\sqrt{Ax^2+Ay^2}$";
  direction = "$\\theta = \\arctan{\\frac{Ay}{Ax}}$";

  // Properties of vectors
  commutative = "$A + B = B + A$";
  associative = "$(A + B) + C = A + (B + C)$";
  negative = "$A + (-A) = 0$";

  // First example
  vectorA = "$A = (5, 2)$";
  vectorB = "$B = (7, 1)$";
  vectorC = "$C = (6, 3)$";
  abc = "$A + B + C = ((5 + 7 + 6), (2 + 1 + 3))$";
  abc2 = "$A + B + C = (18, 6)$";
  magnitudeABC = "$R = \\sqrt{{18}^2+{6}^2}$";
  magnitudeRes = "$R = 18.97$";
  directionABC = "$\\theta = \\arctan{\\frac{6}{18}}$";
  directionRes = "$\\theta = 18.43°$";

  // Second example
  vectorA2 = "$A = 120m, 45°$";
  vectorB2 = "$B = 40m, 60°$";
  a2xcomponent = "$Ax = 84.85m$";
  a2ycomponent = "$Ay = 84.85m$";
  b2xcomponent = "$Bx = 20m$";
  b2ycomponent = "$By = 34.64m$";
  ab = "$A + B = ((84.5 + 20), (84.5 + 34.64))$";
  ab2 = "$A + B = (104.85, 119.49)$";
  magnitudeAB = "$R = \\sqrt{{104.85}^2+{119.49}^2}$";
  magnitudeRes2 = "$R = 158.97$";
  directionAB = "$\\theta = \\arctan{\\frac{119.49}{104.85}}$";
  directionRes2 = "$\\theta = 48.73°$";

  /* OPEN DIALOGS */

  openDialog(id: number) {
    switch (id) {
      case 1: this.dialog.open(EqualityComponent, { width: '80%'}); break;
      case 2: this.dialog.open(CommutativeComponent, { width: '80%'}); break;
      case 3: this.dialog.open(AssociativeComponent, { width: '80%'}); break;
      case 4: this.dialog.open(NegativeComponent, { width: '80%'}); break;
    }
  }
}
