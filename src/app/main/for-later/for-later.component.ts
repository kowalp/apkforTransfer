import { MainService } from './../main.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-for-later',
  templateUrl: './for-later.component.html',
  styleUrls: ['./for-later.component.scss'],
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
export class ForLaterComponent implements OnInit {
  name = 'Trip';
  name2 = 'Transfer';
  state3 = 'normal';
  state4 = 'normal';
  iloscOsob = 'numberOfPeople';
  state = 'normal';
  stateForName = 'normal';
  stateForSubmit = 'normal';
  showTrip = 'normal';
  showTransfer = 'normal';
  people = 'normal';

  ppl = ['1-4', '5-8', 'MORE'];
  transfers = ['HOTEL - KRAKOW AIRPORT', 'HOTEL - KATOWICE AIRPORT', 'HOTEL - WARSAW AIRPORT'];
  trips = [
    'SALT MINE WIELICZKA',
    'AUSCHWITZ - BIRKENAU OŚWIĘCIM',
    'ROUND TRIP KRAKÓW',
    'DUNAJEC RIVER RAFTING',
    'TATRA MOUNTAINS ZAKOPANE',
    'SANCTUARY CZĘSTOCHOWA',
    'WADOWICE - KALWARIA - ŁAGIEWNIKI',
  ];
  myDate = new Date();
  public min = new Date(2019, 4, 2, 10, 30);

  public max = new Date(2020, 1, 3, 23, 59);
  personChange = false;
    dropdownTransfer(e) {
      e.target.value !== 'Transfer' ? this.state = 'in' : this.state = 'normal';

    }
    dropdownTrip(e) {
      e.target.value !== 'Trip' &&  this.state !== 'in' ? this.state = 'in' : this.state = 'normal';
    }
    dropdownPpl(e) {
      e.target.value !== 'numberOfPeople' ? this.stateForName = 'in' : this.stateForName = 'normal';
    }
    pickARide(e) {
      e.target.value === 'Trip' ? this.showTrip = 'in' : this.showTrip = 'normal';
      e.target.value === 'Transfer' ? this.showTransfer = 'in' : this.showTransfer = 'normal';

    }
  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit() {
  console.log(this.myDate.getFullYear);
  }
  onSubmit(form: NgForm) {
    const values = form.value;
    this.mainService.sendForNow(values)
    .subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
    );
    setTimeout(() => {
      this.router.navigate(['Home']);
  }, 600);
  }
  onAnimate() {
    this.state3 === 'normal' ? this.state3 = 'in' : this.state3 = 'normal';
  }
  onAnimate2() {
    this.state4 === 'normal' ? this.state4 = 'in' : this.state4 = 'normal';
  }
}
