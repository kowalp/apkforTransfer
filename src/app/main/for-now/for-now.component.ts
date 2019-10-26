import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-for-now',
  templateUrl: './for-now.component.html',
  styleUrls: ['./for-now.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('normal', style({
        transform: 'translateY(-90px)',
        opacity: 0
      })),
      state('in', style({
      })),
      transition('normal => in', [
        style({
        transform: 'translateY(-90px)',
        opacity: 0
        }),
        animate(700, style({
        transform: 'translateY(-50px)',
        opacity: 0.5

        })),
        animate(300, style({
        transform: 'translateY(0px)',
        opacity: 1

        }))
      ]),
      transition('in => normal', [
        style({
        transform: 'translateY(0px)',
        opacity: 1
        }),
        animate(700, style({
        transform: 'translateY(-50px)',
        opacity: 0.5

        })),
        animate(300, style({
        transform: 'translateY(-90px)',
        opacity: 0

        }))
      ]),

    ]),
    trigger('fadeIn3', [
      state('normal', style({
        marginLeft: '-117px',
        opacity: 1
      })),
      state('in', style({
      })),
      transition('normal => in', [
        style({
        marginLeft: '-117px',
        }),
        animate(400, style({
          marginLeft: '-50px',
        })),
        animate(200, style({
          marginLeft: '0px',
        }))
      ]),
      transition('in => normal', [
        style({
          marginLeft: '0px',
        }),
        animate(400, style({
          marginLeft: '-50px',
        })),
        animate(200, style({
        marginLeft: '-117px',
        }))
      ]),
    ]),

    trigger('fadeIn4', [
      state('normal', style({
        marginLeft: '-87px',
        opacity: 1
      })),
      state('in', style({
      })),
      transition('normal => in', [
        style({
        marginLeft: '-87px',
        }),
        animate(400, style({
          marginLeft: '-35px',
        })),
        animate(200, style({
          marginLeft: '0px',
        })),
        animate(700, style({
          borderBottom: '1px solid hsl(210, 50%, 40%)',
        }))
      ]),
      transition('in => normal', [
        style({
          marginLeft: '0px',
        }),
        animate(400, style({
          marginLeft: '-35px',
        })),
        animate(200, style({
        marginLeft: '-87px',
        }))
      ]),
    ])
  ]
})
export class ForNowComponent implements OnInit {
  name = 'Trip';
  name2 = 'Transfer';
  iloscOsob = 'numberOfPeople';
  state3 = 'normal';
  state4 = 'normal';
  state = 'normal';
  stateForName = 'normal';
  showTrip = 'normal';
  showTransfer = 'normal';
  showsubmit = 'normal';

  ppl = ['1-4', '5-8', 'MORE'];
  transfers = ['HOTEL - KRAKOW AIRPORT', 'HOTEL - KATOWICE AIRPORT', 'HOTEL - WARSAW AIRPORT'];
  trips = [
  'SALT MINE WIELICZKA',
  'AUSCHWITZ - BIRKENAU OŚWIĘCIM',
  'ROUND TRIP KRAKÓW', 'DUNAJEC RIVER RAFTING',
  'TATRA MOUNTAINS ZAKOPANE',
  'SANCTUARY CZĘSTOCHOWA',
  'WADOWICE - KALWARIA - ŁAGIEWNIKI'
  ];
  personChange = false;
    dropdownTransfer(e) {
      e.target.value !== 'Transfer' ? this.state = 'in' : this.state = 'normal';
    }
    dropdownTrip(e) {
      e.target.value !== 'Trip' ? this.state = 'in' : this.state = 'normal';
    }
  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit() {
      this.mainService.GetTours()
      .subscribe((res) => console.log(res),
      (err) => console.log(err));
      this.mainService.GetTrips()
      .subscribe((res) => console.log(res),
      (err) => console.log(err));
  }
  onSubmit(form: NgForm) {
    const values = form.value;
    this.mainService.sendForNow(values)
    .subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
    );

    console.log(values);

  }
  onAnimate() {
    this.state3 === 'normal' ? this.state3 = 'in' : this.state3 = 'normal';
  }
  onAnimate2() {
    this.state4 === 'normal' ? this.state4 = 'in' : this.state4 = 'normal';
  }
  pickARide(e) {
    e.target.value === 'Trip' ? this.showTrip = 'in' : this.showTrip = 'normal';
    e.target.value === 'Transfer' ? this.showTransfer = 'in' : this.showTransfer = 'normal';

  }
  showSubmit(e) {
    e.target.value !== 'numberOfPeople' ? this.showsubmit = 'in' : this.showsubmit = 'normal';
  }
}
