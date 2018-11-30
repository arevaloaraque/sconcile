import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { BasicInputsComponent } from './component/form/basic-inputs/basic-inputs.component';
import { CheckboxRadioComponent } from './component/form/checkbox-radio/checkbox-radio.component';
import { SelectComponent } from './component/form/select/select.component';
import { MultiselectComponent } from './component/form/multiselect/multiselect.component';
import { InputGroupsComponent } from './component/form/input-groups/input-groups.component';
import { ExtendedControlsComponent } from './component/form/extended-controls/extended-controls.component';
import { FloatingLabelsComponent } from './component/form/floating-labels/floating-labels.component';
import { TagInputsComponent } from './component/form/tag-inputs/tag-inputs.component';
import { DualListboxesComponent } from './component/form/dual-listboxes/dual-listboxes.component';
import { ValidationComponent } from './component/form/validation/validation.component';
import { FormWizardComponent } from './component/form/form-wizard/form-wizard.component';
import { FormActionsComponent } from './component/form/form-actions/form-actions.component';
import { InputesGridComponent } from './component/form/inputes-grid/inputes-grid.component';
import { ChangelogComponent } from './component/changelog/changelog.component';
import { LoginComponent } from './auth/login/login.component';
import { BasicInputComponent } from './component/json-forms/basic-input/basic-input.component';
import { AdvancedInputeComponent } from './component/json-forms/advanced-inpute/advanced-inpute.component';
import { ControlsComponent } from './component/json-forms/controls/controls.component';

import { AuthGuard } from './_guards';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    BasicInputsComponent,
    CheckboxRadioComponent,
    SelectComponent,
    MultiselectComponent,
    InputGroupsComponent,
    ExtendedControlsComponent,
    FloatingLabelsComponent,
    TagInputsComponent,
    DualListboxesComponent,
    ValidationComponent,
    FormWizardComponent,
    FormActionsComponent,
    InputesGridComponent,
    ChangelogComponent,
    LoginComponent,
    BasicInputComponent,
    AdvancedInputeComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
