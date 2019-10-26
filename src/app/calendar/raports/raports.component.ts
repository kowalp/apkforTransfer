import { MainService } from './../../main/main.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raports',
  templateUrl: './raports.component.html',
  styleUrls: ['./raports.component.scss']})
export class RaportsComponent implements OnInit {
//   public selectedMoments = [
//     new Date(2018, 1, 12, 10, 30),
//     new Date(2018, 3, 21, 20, 30)
// ];

  constructor(private mainService: MainService, private router: Router) {}
   ngOnInit(): void {}
  // onSubmit(form: NgForm) {
  //   const values = form.value;
  // //   this.mainService.sendForNow(values)
  // //   .subscribe(
  // //   (res) => console.log(res),
  // //   (err) => console.log(err)
  // //   );
  // //   setTimeout(() => {
  // //     this.router.navigate(['Home']);
  // // }, 600);
  //   console.log(values);
  //  }
}
