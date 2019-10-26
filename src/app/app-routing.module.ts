import { RaportsComponent } from './calendar/raports/raports.component';
import { MasterGuard } from './log-in/master-guard';
import { EditModeComponent } from './calendar/edit-mode/edit-mode.component';
import { AuthGuard } from './log-in/auth-guard';
import { LogInComponent } from './log-in/log-in.component';

import { ForLaterComponent } from './main/for-later/for-later.component';
import { ForNowComponent } from './main/for-now/for-now.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { EditFormsComponent } from './calendar/edit-mode/edit-forms/edit-forms.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'Home' , component: MainComponent, data: {animation: 'Home'}, canActivate: [ AuthGuard ]},
    { path: 'raports' , component: RaportsComponent, data: {animation: 'Raports'}, canActivate: [ AuthGuard ]},
    { path: 'forNow' , component: ForNowComponent, data: {animation: 'ForNow'}, canActivate: [ AuthGuard ]},
    { path: 'forLater' , component: ForLaterComponent, data: {animation: 'ForLater'}, canActivate: [ AuthGuard ]},
    { path: 'calendar' , component: CalendarComponent, data: {animation: 'Calendar'}, canActivate: [ AuthGuard ]},
    { path: 'edit' , component: EditModeComponent, data: {animation: 'Raports'}, canActivate: [ MasterGuard ]},
    { path: 'editForms' , component: EditFormsComponent, data: {animation: 'Raports'}, canActivate: [ MasterGuard ]},
    { path: 'login' , component: LogInComponent, data: {animation: 'login'}},
    { path: 'register' , component: RegisterUserComponent, data: {animation: 'register'}, canActivate: [ MasterGuard ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
