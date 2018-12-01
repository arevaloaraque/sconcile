import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/home/home.component';


// Form components //
// import { BasicInputsComponent } from './component/form/basic-inputs/basic-inputs.component';
// import { CheckboxRadioComponent } from './component/form/checkbox-radio/checkbox-radio.component';
// import { SelectComponent } from './component/form/select/select.component';
// import { MultiselectComponent } from './component/form/multiselect/multiselect.component';
// import { InputGroupsComponent } from './component/form/input-groups/input-groups.component';
// import { ExtendedControlsComponent } from './component/form/extended-controls/extended-controls.component';
// import { FloatingLabelsComponent } from './component/form/floating-labels/floating-labels.component';
// import { TagInputsComponent } from './component/form/tag-inputs/tag-inputs.component';
// import { DualListboxesComponent } from './component/form/dual-listboxes/dual-listboxes.component';
// import { ValidationComponent } from './component/form/validation/validation.component';
// import { FormWizardComponent } from './component/form/form-wizard/form-wizard.component';
// import { FormActionsComponent } from './component/form/form-actions/form-actions.component';
// import { InputesGridComponent } from './component/form/inputes-grid/inputes-grid.component';

// import { ChangelogComponent} from './component/changelog/changelog.component';

import {LoginComponent} from './auth/login/login.component';

// Json forms

// import { BasicInputComponent } from './component/json-forms/basic-input/basic-input.component';
// import { AdvancedInputeComponent } from './component/json-forms/advanced-inpute/advanced-inpute.component';
// import { ControlsComponent } from './component/json-forms/controls/controls.component';

import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'login',component:LoginComponent},
  // {path:'changelog',component:ChangelogComponent,canActivate: [AuthGuard]},
  // {
  //   path:'form',
  //   canActivate: [AuthGuard],
  //   children:[
  //     {path:'basic-input',component:BasicInputsComponent},
  //     {path:'checkbox-radio',component:CheckboxRadioComponent},
  //     {path:'select',component:SelectComponent},
  //     {path:'multi-select',component:MultiselectComponent},
  //     {path:'input-groups',component:InputGroupsComponent},
  //     {path:'extended-controls',component:ExtendedControlsComponent},
  //     {path:'floating-label',component:FloatingLabelsComponent},
  //     {path:'tag-input',component:TagInputsComponent},
  //     {path:'dual-listboxes',component:DualListboxesComponent},
  //     {path:'validation',component:ValidationComponent},
  //     {path:'form-wizard',component:FormWizardComponent},
  //     {path:'form-actions',component:FormActionsComponent},
  //     {path:'inputs-grid',component:InputesGridComponent}
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
