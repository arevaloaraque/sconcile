import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { GrdFilterPipe } from './filter.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {CalendarModule} from 'primeng/calendar';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './auth/login/login.component';

import { AuthGuard } from './_guards';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TransactionsComponent } from './component/transactions/transactions.component';
import { DaterangeDirective } from './daterange.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    UserProfileComponent,
    DashboardComponent,
    TransactionsComponent,
    GrdFilterPipe,
    DaterangeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    CalendarModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}