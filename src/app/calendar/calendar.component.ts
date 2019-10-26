import { CalendarService } from './calendar.service';
import { MatMenuTrigger } from '@angular/material';
import * as moment from 'moment'; // add this 1 of 4
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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  hotelForm: Array<CalendarEvent<{ time: any }>> = [];
  invidualForm: Array<CalendarEvent<{ time: any }>> = [];
  allFroms: Array<CalendarEvent<{ time: any }>> = [];
  tours = [];


  constructor(private modal: NgbModal, private calendarService: CalendarService) {
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
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

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
    {
    start: new Date('2019-04-19T03:24:00'),
    Email: 'dsa@o2.pl',
    end: new Date('2019-04-19T06:24:00'),
    title: 'BALICE TRANSPORT',
    Phone: '533687183',
    Transfer: 'BALICE - KRAKOW AIRPORT',
    Trip: '',
    PersonCount: '1-4',
    Price: 123
    },
    {
      start: new Date('2019-04-19T19:24:00'),
      end: new Date('2019-04-19T22:24:00'),
      Email: 'dsa@o2.pl',
      title: 'Title',
      Phone: '533687183',
      Transfer: 'BALICE - KRAKOW AIRPORT',
      Trip: '',
      PersonCount: '1-4',
      Price: 123
      },
  ];

  activeDayIsOpen = true;

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
  ngOnInit() {
    this.calendarService.getTours()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              name: res[key].name,
              price: res[key].price,
              duration: res[key].duration,
            };
            this.tours.push(element);
          }
        }
      }
    );
    setTimeout( () => {
    this.calendarService.hotelForms()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              Name: res[key].name || '',
              start: new Date(res[key].arrivalTime),
              end: new Date(res[key].tourEndTime),
              title: res[key].title,
              Email: res[key].email || '',
              Phone: res[key].phone || '',
              Transfer: res[key].transfer || '',
              Trip: res[key].tour || '',
              PersonCount: res[key].personCount,
              Price: res[key].price
            };
            this.invidualForm.push(element);
          }
        }
      });
    this.calendarService.invidualForms()
    .subscribe(
      (res) => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = {
              Name: res[key].name || '',
              start: new Date(res[key].arrivalTime),
              end: this.getEndTime(new Date(res[key].tourStartTime), res[key].tour),
              title: res[key].title,
              Email: res[key].email || '',
              Phone: res[key].phone || '',
              Transfer: res[key].transfer || '',
              Trip: res[key].tour || '',
              PersonCount: res[key].personCount,
              Price: this.getPrice(res[key].tour)
            };
            this.hotelForm.push(element);
          }
        }
        this.allFroms = [...this.hotelForm, ...this.invidualForm];
        this.events = this.allFroms;
        console.log(this.events);

    });
  }, 100);
  }

  getEndTime(time: Date, tour: string) {
    for (const key of this.tours) {
      console.log(key.name);
      console.log(tour);

      if (tour === key.name) {
        const newDate = moment(time).add(key.duration, 'm').toDate();
        console.log(newDate);
        return newDate;
      }
    }
  }
  getPrice(tour: string) {
    for (const key of this.tours) {
      console.log(key.name);
      console.log(tour);

      if (tour === key.name) {
        console.log(key.price);
        return key.price;
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
    start: new Date('2019-04-19T19:24:00'),
        Name: 'Test',
        title: 'aa',
        Email: 'dsa@o2.pl',
        Phone: '000000000',
        end: new Date('2019-04-19T20:24:00'),
        Transfer: 'BALICE - KRAKOW AIRPORT',
        Trip: '',
        PersonCount: '1-4',
        Price: 213
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
    console.log(this.modalData);
    console.log(this.modalData.event);

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  Click() {
    console.log(this.events);
  }
}
