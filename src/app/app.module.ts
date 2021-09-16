import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TopNavComponent } from './top-nav/top-nav.component';
import { CalenderComponent } from './calender/calender.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { EventdialogComponent } from './eventdialog/eventdialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ChartsModule } from 'ng2-charts';
import { NotificationComponent } from './notification/notification.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { EventclickComponent } from './eventclick/eventclick.component';
import { DateclickComponent } from './dateclick/dateclick.component';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { FilterPipe } from './common/filter.pipe';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CommonService } from './common/common.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatExpansionModule } from '@angular/material/expansion';
import { LeavedialogComponent } from './leavedialog/leavedialog.component';
import { MessageComponent } from './common/message/message.component';



import {CKEditorModule} from 'ng2-ckeditor';
import { CommonModule } from '@angular/common';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    MenuListItemComponent,
    TopNavComponent,
    CalenderComponent,
    DashboardComponent,
    EventdialogComponent,
    NotificationComponent,
    EventclickComponent,
    DateclickComponent,
    FilterPipe,
    ForgotpasswordComponent,
    EmployeelistComponent,
    LeavedialogComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    FullCalendarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    ChartsModule,
    MatBadgeModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MaterialTimePickerModule,
    MatCheckboxModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatSlideToggleModule,
    MatExpansionModule,
    CKEditorModule,
    CommonModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    FullCalendarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    ChartsModule,
    MatBadgeModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MaterialTimePickerModule,
    MatCheckboxModule,
    NgMultiSelectDropDownModule,
    MatSlideToggleModule,
    MatExpansionModule,
    CKEditorModule,
    CommonModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
  entryComponents: [MessageComponent, LeavedialogComponent, EventdialogComponent, EventclickComponent, DateclickComponent, ForgotpasswordComponent]
})
export class AppModule { }