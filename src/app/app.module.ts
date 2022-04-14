import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MathjaxModule } from 'mathjax-angular';
import { ToastrModule } from 'ngx-toastr';

// Components
import { LearnComponent } from './learn/learn.component';
import { CalculateComponent } from './calculate/calculate.component';
import { PracticeComponent } from './practice/practice.component';

// Angular Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EqualityComponent } from './dialogs/equality/equality.component';
import { CommutativeComponent } from './dialogs/commutative/commutative.component';
import { AssociativeComponent } from './dialogs/associative/associative.component';
import { NegativeComponent } from './dialogs/negative/negative.component';

@NgModule({
  declarations: [
    AppComponent,
    LearnComponent,
    CalculateComponent,
    PracticeComponent,
    EqualityComponent,
    CommutativeComponent,
    AssociativeComponent,
    NegativeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MathjaxModule.forRoot(),
    ToastrModule.forRoot(),
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
