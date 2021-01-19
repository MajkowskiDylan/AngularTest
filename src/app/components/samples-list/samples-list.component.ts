import { FreezerService } from './../../services/freezer.service';
import { Freezer } from './../../models/freezer.model';
import { Drawer } from './../../models/drawer.model';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { Sample } from './../../models/sample.model';
import { SampleService } from './../../services/sample.service';
import { DrawerService } from './../../services/drawer.service';
import { Patient } from './../../models/patient.model';

@Component({
  selector: 'app-samples-list',
  templateUrl: './samples-list.component.html',
  styleUrls: ['./samples-list.component.css']
})
export class SamplesListComponent implements OnInit {
  samples?: Sample[];
  patients?: Patient[];
  freezers?: Freezer[];
  drawers?: Drawer[];
  currentSample?: Sample;
  currentPatient?: Patient;
  currentIndex = -1;
  title = '';

  constructor(private sampleService: SampleService, private patientService: PatientService,
              private freezerService: FreezerService, private drawerService: DrawerService) {  }

  ngOnInit(): void {
    this.retrieveFreezers();
    this.retrieveDrawers();
    this.retrievePatients();
    this.retrieveSamples();
  }

  savePatient(data): void {
    this.patientService.create(data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  saveFreezer(data): void {
    this.freezerService.create(data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  saveDrawer(data): void {
    this.drawerService.create(data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  retrieveFreezers(): void {
    const freezerA: Freezer = {
      temperature: 38
    };

    const freezerB: Freezer = {
      temperature: 12
    };

    this.freezerService.getAll()
      .subscribe(
        data => {
          this.freezers = data;
          console.log(data);
          if (this.freezers.length < 1)
          {
            this.saveFreezer(freezerA);
            this.saveFreezer(freezerB);
          }

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveDrawers(): void {
    const drawerA: Drawer = {
      freezerId: 1,
      busy: false
    };
    const drawerB: Drawer = {
      freezerId: 1,
      busy: false
    };

    const drawerC: Drawer = {
      freezerId: 1,
      busy: false
    };

    const drawerD: Drawer = {
      freezerId: 2,
      busy: false
    };
    this.drawerService.getAll()
      .subscribe(
        data => {
          this.drawers = data;

          if (this.drawers.length < 1)
          {
            this.saveDrawer(drawerA);
            this.saveDrawer(drawerB);
          }

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrievePatients(): void {
    const patientA: Patient = {
      name: 'Hubert',
      surname: 'Bonisseur de la Bath',
      birthday: '1974-01-16',
      kind: 'M'
    };

    const patientB: Patient = {
      name: 'Arnaud',
      surname: 'Villefranche',
      birthday: '1984-01-15',
      kind: 'M'
    };

    const patientC: Patient = {
      name: 'Adrien',
      surname: 'Pereclisse',
      birthday: '1994-01-15',
      kind: 'F'
    };
    this.patientService.getAll()
      .subscribe(
        data => {
          this.patients = data;

          if (this.patients.length < 1)
          {
            this.savePatient(patientA);
            this.savePatient(patientB);
            this.savePatient(patientC);
          }
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrievePatient(): void {
    console.log(this.currentSample.patientId);
    this.patientService.get(this.currentSample.patientId)
      .subscribe(
        data => {
          this.currentPatient = data;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveSamples(): void {
    this.sampleService.getAll()
      .subscribe(
        data => {
          this.samples = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveSamples();
    this.currentSample = undefined;
    this.currentIndex = -1;
  }

  setActiveSample(sample: Sample, index: number): void {
    this.currentSample = sample;
    this.retrievePatient();
    this.currentIndex = index;
  }

  removeAllSamples(): void {
    this.sampleService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentSample = undefined;
    this.currentIndex = -1;

    this.sampleService.findByTitle(this.title)
      .subscribe(
        data => {
          this.samples = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
