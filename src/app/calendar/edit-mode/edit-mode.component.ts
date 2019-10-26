import { CalendarService } from './../calendar.service';
import { HttpErrorResponse } from '@angular/common/http';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.scss']
})
export class EditModeComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  hotelForm: any[];
  invidualForm: any[];
  allForm = [];

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  constructor(private modal: NgbModal, private calendarService: CalendarService) {
  }
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
  ];

  activeDayIsOpen = true;

  ngOnInit() {
    this.calendarService.hotelForms()
    .subscribe(
      (res) => {
      // this.hotelForm = res;
      console.log(res);
    });
    this.calendarService.invidualForms()
    .subscribe(
      (res) => {
      console.log(res);

      // this.invidualForm = (res);
    });
    // console.log(this.hotelForm);
    // console.log(this.invidualForm);

    // this.allForm = [...this.invidualForm, ...this.hotelForm];
    // console.log(this.allForm);

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
    start: new Date('2019-04-19T03:24:00'),
        title: 'aa',
        Name: 'Test',
        Phone: '000000000',
        Email: 'dsa@o2.pl',
        end: new Date('2019-04-19T07:24:00'),
        Transfer: 'BALICE - LOTNISKO KRAKOW AIRPORT',
        Trip: '',
        PersonCount: '1-4',
        draggable: true,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        Price: 100
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    this.calendarService.DeleteEvent(eventToDelete)
    .subscribe((res) => console.log(res));
    console.log(eventToDelete);
  }
  updateEvent(ArrivalTime, DepartureTime, personCount, trip, transfer, phone, name, email) {
    const arrayOfData = {
      Name: name,
      Phone: phone,
      Email: email,
      PersonCount: personCount,
      DepartureTime,
      ArrivalTime,
      Tour: trip,
      Transfer: transfer,
      Price: '100',
    };
    this.calendarService.UpdateEvent(arrayOfData)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
    console.log(arrayOfData);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  saveEvent(ArrivalTime, DepartureTime, personCount, trip, transfer, phone, name, email) {
    const arrayOfData = {
        Name: name,
        Phone: phone,
        Email: email,
        PersonCount: personCount,
        DepartureTime,
        ArrivalTime,
        Tour: trip,
        Transfer: transfer,
        Price: 100,
        Id: Date.now()
      }
  ;
    this.calendarService.SaveEvent(arrayOfData)
    .subscribe((data: any) => {
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      console.log(err );
    });
    console.log(arrayOfData);
  }
}
