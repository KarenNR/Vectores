import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  answered: boolean = false;

  /* RANDOM QUANTITIES */

  // Question 1
  magnitude1!: number;
  direction1!: number;
  component1!: string;

  // Question 2
  component2!: number;
  magnitude2!: number;

  // Question 3
  magnitude3A!: number;
  direction3A!: number;
  magnitude3B!: number;
  direction3B!: number;

  // Question 4
  xA4!: number;
  yA4!: number;
  xB4!: number;
  yB4!: number;
  xC4!: number;
  yC4!: number;

  // Question 5
  magnitude5A!: number;
  direction5A!: string;
  magnitude5B!: number;
  direction5B!: string;

  // Correct answers
  question1!: number;
  question2!: number;
  question3!: number;
  question4!: number;
  question5!: number;

  /* EXAM FORM */

  ExamForm!: FormGroup;
  answer1!: FormControl;
  answer2!: FormControl;
  answer3!: FormControl;
  answer4!: FormControl;
  answer5!: FormControl;

  constructor(
    private _notifyService : NotificationService
  ) { }

  ngOnInit(): void {
    this.generateRandomValues();
    this.setCorrectAnswers();
    this.createFormControls();
    this.createForm();
  }

  generateRandomValues(): void {
    
    // Question 1
    this.magnitude1 = Math.floor(Math.random() * 200) + 1;
    this.direction1 = Math.floor(Math.random() * 360) + 1;
    this.component1 = Math.random() < 0.5 ? 'X' : 'Y';
    
    // Question 2
    this.component2 = Math.floor(Math.random() * 200) + 1;
    do {
      this.magnitude2 = Math.floor(Math.random() * 200) + 1;
    } while(this.component2 > this.magnitude2);
    
    // Question 3
    this.magnitude3A = Math.floor(Math.random() * 200) + 1;
    this.direction3A = Math.floor(Math.random() * 360) + 1;
    this.magnitude3B = Math.floor(Math.random() * 200) + 1;
    this.direction3B = Math.floor(Math.random() * 360) + 1;
    
    // Question 4
    this.xA4 = Math.floor(Math.random() * 200) + 1;
    this.yA4 = Math.floor(Math.random() * 200) + 1;
    this.xB4 = Math.floor(Math.random() * 200) + 1;
    this.yB4 = Math.floor(Math.random() * 200) + 1;
    this.xC4 = Math.floor(Math.random() * 200) + 1;
    this.yC4 = Math.floor(Math.random() * 200) + 1;
    
    // Question 5
    let random1 = Math.floor(Math.random() * 4) + 1;
    let random2 = Math.floor(Math.random() * 4) + 1;
    this.magnitude5A = Math.floor(Math.random() * 200) + 1;
    this.magnitude5B = Math.floor(Math.random() * 200) + 1;
    switch (random1) {
      case 1: this.direction5A = "Norte"; break;
      case 2: this.direction5A = "Sur"; break;
      case 3: this.direction5A = "Este"; break;
      case 4: this.direction5A = "Oeste"; break;
    }
    switch (random2) {
      case 1: this.direction5B = "Norte"; break;
      case 2: this.direction5B = "Sur"; break;
      case 3: this.direction5B = "Este"; break;
      case 4: this.direction5B = "Oeste"; break;
    }
  } 

  setCorrectAnswers(): void {
    
    // Question 1
    if (this.component1 == 'X') {
      this.question1 = this.magnitude1 * Math.cos(this.direction1*Math.PI/180);
    }
    else {
      this.question1 = this.magnitude1 * Math.sin(this.direction1*Math.PI/180);
    }

    // Question 2
    this.question2 = Math.acos(this.component2/this.magnitude2)*180/Math.PI;

    // Question 3
    let resX = this.magnitude3A*Math.cos(this.direction3A*Math.PI/180) + this.magnitude3B*Math.cos(this.direction3B*Math.PI/180);
    let resY = this.magnitude3A*Math.sin(this.direction3A*Math.PI/180) + this.magnitude3B*Math.sin(this.direction3B*Math.PI/180);
    this.question3 = Math.sqrt( Math.pow(resX,2) + Math.pow(resY,2) );

    // Question 4
    resX = this.xA4 + this.xB4 + this.xC4;
    resY = this.yA4 + this.yB4 + this.yC4;
    this.question4 = Math.atan(resY/resX)*180/Math.PI;

    // Question 5
    let dir1 = 0;
    let dir2 = 0;
    switch (this.direction5A) {
      case "Norte": dir1 = 90; break;
      case "Sur": dir1 = 270; break;
      case "Este": dir1 = 0; break;
      case "Oeste": dir1 = 180; break;
    }
    switch (this.direction5B) {
      case "Norte": dir2 = 90; break;
      case "Sur": dir2 = 270; break;
      case "Este": dir2 = 0; break;
      case "Oeste": dir2 = 180; break;
    }
    resX = this.magnitude5A*Math.cos(dir1*Math.PI/180) + this.magnitude5B*Math.cos(dir2*Math.PI/180);
    resY = this.magnitude5A*Math.sin(dir1*Math.PI/180) + this.magnitude5B*Math.sin(dir2*Math.PI/180);
    this.question5 = Math.sqrt( Math.pow(resX,2) + Math.pow(resY,2) );
  }

  private createFormControls(): void {
    this.answer1 = new FormControl('', { updateOn: 'change', validators: [Validators.required] });
    this.answer2 = new FormControl('', { updateOn: 'change', validators: [Validators.required] });
    this.answer3 = new FormControl('', { updateOn: 'change', validators: [Validators.required] });
    this.answer4 = new FormControl('', { updateOn: 'change', validators: [Validators.required] });
    this.answer5 = new FormControl('', { updateOn: 'change', validators: [Validators.required] });
  }

  private createForm(): void {
    this.ExamForm = new FormGroup({
      'answer1': this.answer1,
      'answer2': this.answer2,
      'answer3': this.answer3,
      'answer4': this.answer4,
      'answer5': this.answer5
    });
  }

  evaluate(): void {
    // Calculate number of correct answers
    let correct = 0;
    if (Math.abs(this.answer1.value) >= Math.abs(this.question1)-Math.abs(this.question1)*0.02 && Math.abs(this.answer1.value) <= Math.abs(this.question1)+Math.abs(this.question1)*0.02) {
      if (this.question1<0 && this.answer1.value<0)
        correct++;
      else if(this.question1>=0 && this.answer1.value>=0)
        correct++;
    }
    if (this.answer2.value >= this.question2-this.question2*0.02 && this.answer2.value <= this.question2+this.question2*0.02)
      correct++;
    if (this.answer3.value >= this.question3-this.question3*0.02 && this.answer3.value <= this.question3+this.question3*0.02)
      correct++;
    if (this.answer4.value >= this.question4-this.question4*0.02 && this.answer4.value <= this.question4+this.question4*0.02)
      correct++;
    if (this.answer5.value >= this.question5-this.question5*0.02 && this.answer5.value <= this.question5+this.question5*0.02)
      correct++;
    // Present results
    if (correct < 3)
      this._notifyService.showInfo("Has obtenido " + correct + " respuestas correctas.", "¡Inténtalo de nuevo!");
    else if (correct == 3 || correct == 4)
      this._notifyService.showInfo("Has obtenido " + correct + " respuestas correctas.", "¡Bien hecho!");
    else
      this._notifyService.showSuccess("Has obtenido " + correct + " respuestas correctas.", "¡Felicidades!");
    this.answered = true;
  }

  reset(): void {
    this.answer1.setValue('');
    this.answer2.setValue('');
    this.answer3.setValue('');
    this.answer4.setValue('');
    this.answer5.setValue('');
    this.generateRandomValues();
    this.setCorrectAnswers();
    this.answered = false;
  }

  round2Decimals(x: number): number {
    return Math.round(x * 100) / 100;
  }
}
