import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {  OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Airport } from '@models/airport.model';
import { Flight } from '@models/flight.model';




import {FlightService } from '@services/flight.service';

@Component({
  selector: 'find-root',
  templateUrl: './find_flight.component.html',
  providers: [FlightService]
})


export class FindFlight implements OnInit{

    air: Airport;
    fli: Flight;
    rand: Airport;
    code: string;

    constructor(
        private router: Router,
        private flight: FlightService,
        private route: ActivatedRoute
    ) {
    }
    ngOnInit() {
      this.code = this.route.snapshot.paramMap.get("code")
        this.flight.filterAirports(this.code).subscribe(data => {this.air = data["0"] } );
        this.flight.filterAirports("").subscribe(data => {this.rand = data[Math.floor(Math.random() * 99)] } );
    }

    onKey(event: any) {

     this.flight.findFlights(event.target.value).subscribe(data => {this.fli = data[Math.floor(Math.random() * 4)] } ); //.subscribe(data => this.air = data);

  }


  onClickMe(){

  }
  tryAgain(){
    const code = this.route.snapshot.paramMap.get("code")
      this.flight.filterAirports(code).subscribe(data => {this.air = data["0"] } );
      this.flight.filterAirports("e").subscribe(data => {this.rand = data[Math.floor(Math.random() * 99)] } );
  }


}