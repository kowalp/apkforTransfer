import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.scss']
})
export class EditFormsComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
  }
  SubmitHotel(form: NgForm) {
    const values = form.value;
    console.log(values);
    this.calendarService.SubmitHotel(values)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  SubmitTour(form: NgForm) {
    const values = form.value;
    console.log(values);
    this.calendarService.SubmitTrip(values)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  SubmitTransfer(form: NgForm) {
    const values = form.value;
    console.log(values);
    this.calendarService.SubmitTransfer(values)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  DeleteHotel(form: NgForm) {
    const values = form.value;
    console.log(values);
    this.calendarService.DeleteHotel(values)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  DeleteTour(form: NgForm) {
    const values = form.value;
    console.log(values);
    this.calendarService.DeleteTrip(values)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }
  DeleteTransfer(form: NgForm) {
    const values = form.value;
    console.log(values);
    this.calendarService.DeleteTransfer(values)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
  }

}
