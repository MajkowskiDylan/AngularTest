import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Patient } from './../../models/patient.model';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  @Input() patient: Patient;
  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  calculateDiff(dateSent): number{
    const currentDate = this.currentDate.getFullYear();
    dateSent = new Date(dateSent);
    const age = currentDate - dateSent.getFullYear();
    return age;
}
}
