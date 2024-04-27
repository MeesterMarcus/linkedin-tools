import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  expForm: FormGroup;
  totalExpText: string = '';

  constructor(private fb: FormBuilder) {
    this.expForm = this.fb.group({
      experiences: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      this.addExperienceInput(); // Initialize with some inputs
    }
  }

  get experiences(): FormArray {
    return this.expForm.get('experiences') as FormArray;
  }

  addExperienceInput() {
    const newExperience = new FormGroup({
      yrsInput: new FormControl(null),
      monthsInput: new FormControl(null, [Validators.max(11)]),
    });
    this.experiences.push(newExperience);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index); // Use removeAt to delete the FormGroup at the specified index
}

  calcTotalExperience() {
    let totalYears = 0;
    let totalMonths = 0;
    this.experiences.controls.forEach((group) => {
      totalYears += group.get('yrsInput')?.value;
      totalMonths += group.get('monthsInput')?.value;
    });

    // Convert excess months to years
    totalYears += Math.floor(totalMonths / 12);
    totalMonths %= 12;
    this.totalExpText = `${totalYears} years and ${totalMonths} months`;
  }
}
