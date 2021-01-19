import { Component, Input, OnInit } from '@angular/core';
import { Patient } from './../../models/patient.model';
import { Sample } from './../../models/sample.model';
import { PatientService } from './../../services/patient.service';

@Component({
  selector: 'app-sample-profile',
  templateUrl: './sample-profile.component.html',
  styleUrls: ['./sample-profile.component.css']
})
export class SampleProfileComponent implements OnInit {

  @Input() sample: Sample;
  @Input() patient: Patient;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }


}
