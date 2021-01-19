import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SamplesListComponent } from './components/samples-list/samples-list.component';
import { AddSampleComponent } from './components/add-sample/add-sample.component';

const routes: Routes = [
  { path: '', redirectTo: 'samples', pathMatch: 'full' },
  { path: 'samples', component: SamplesListComponent },
  { path: 'add', component: AddSampleComponent },
  { path: 'patients', component: SamplesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
