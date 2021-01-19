import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Drawer } from './../../models/drawer.model';
import { Freezer } from './../../models/freezer.model';
import { DrawerService } from 'src/app/services/drawer.service';
import { FreezerService } from 'src/app/services/freezer.service';
import { Patient } from './../../models/patient.model';
import { Sample } from './../../models/sample.model';
import { PatientService } from './../../services/patient.service';
import { SampleService } from './../../services/sample.service';

@Component({
  selector: 'app-add-sample',
  templateUrl: './add-sample.component.html',
  styleUrls: ['./add-sample.component.css']
})
export class AddSampleComponent implements OnInit {
  sample: Sample = {
    title: '',
    typePrelevement: '',
    datePrelevement: '',
    patientId: 0,
    drawerId: 0
  };
  submitted = false;
 patients: Patient[];
 freezers: Freezer[];
 drawers: Drawer[];
 selectedFreezer = 0;

  constructor(private sampleService: SampleService, private patientService: PatientService,
              private freezerService: FreezerService, private drawerService: DrawerService) { }

  ngOnInit(): void {
    this.retrieveFreezers();
    this.retrieveDrawers(this.selectedFreezer);
    this.retrievePatients();
  }

  saveSample(): void {
    const data = {
      title: this.sample.title,
      typePrelevement: this.sample.typePrelevement,
      datePrelevement: this.sample.datePrelevement,
      patientId: this.sample.patientId.toString(),
      drawerId: this.sample.drawerId
    };

    this.sampleService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newSample(): void {
    this.submitted = false;
    this.sample = {
      title: '',
      typePrelevement: '',
      datePrelevement: '',
      patientId: 0,
      drawerId: 0
    };
  }

  retrievePatients(): void {
    this.patientService.getAll()
      .subscribe(
        data => {
          this.patients = data;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveFreezers(): void {
    this.freezerService.getAll()
      .subscribe(
        data => {
          this.freezers = data;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveDrawers(no): void {
    this.drawerService.findByFreezer(no)
      .subscribe(
        data => {
          this.drawers = data;
        },
        error => {
          console.log(error);
        });
  }
}
