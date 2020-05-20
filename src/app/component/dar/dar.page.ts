import{Component, OnInit}from '@angular/core';
import {RestApiService}from "src/app/service/rest-api.service";
import {DarDTO}from "src/app/service/vo/dar.dto";
import {Router, ActivatedRoute}from '@angular/router';
import {AuthenticationService}from 'src/app/component/user-management/_services';
@Component({
selector: 'dar-page',
templateUrl: './dar.page.html',
styleUrls: ['./dar.page.scss'],
})
export class DarPage implements OnInit {
selectedRows: any[];
scrollItems: any[];
showScroll: boolean;
allDates: any[];
darDate = new Date();
darSlot = {};
allSlots: any[];

states:  any[];
cities: any[];
selectedState: null;
selectedCity: null;
darDescription: null;
darAddress: null;
serviceCategory: string = null;

constructor(
    private restApiService: RestApiService,
    private router: Router,
        private route: ActivatedRoute,
    private authenticationService: AuthenticationService)
  {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
        this.serviceCategory = params.catagory;
        //console.log(data);
    });

    this._prepare();
    this.restApiService.getStates().subscribe(
    data => {
      this.states = data.states;
      console.log(data);
    }
    );
  this.scrollItems = [

  ];


  }

 onChangeState() {
   // debugger;
    let stateId = this.selectedState;
    if (stateId) {
      this.restApiService.getCities(stateId).subscribe(
        data => {
              this.cities = data.cities
              console.log(data.cities);
        }
      );
    } else {
      this.cities = [];
    }
  }


  selectDarDate(event, date){

      this.darDate = date;
  }

  selectSlot(slot){

    this.darSlot = slot;

  }


  saveBooking(){
    debugger;
    // [routerLink]="['/order-confirmation']"
      let darDTO = new DarDTO();
      darDTO.type="FULL";
      darDTO.createdBy= this.authenticationService.currentUserValue.username; //@TODO: Will be added by Logged in User
      darDTO.status="OPEN";
      darDTO.darDate= this.darDate.getTime();
      darDTO.city = this.selectedCity;
      darDTO.state = this.selectedState;
      darDTO.darSlot = this.darSlot['value'];
      darDTO.address= this.darAddress;
      darDTO.description = this.darDescription;

      this.restApiService.createDar(darDTO).subscribe(data => {
        console.log(data);
        if(data.darId){
           darDTO.darSlot = this.darSlot['name']; // Just for Display Purpose
          this.router.navigate(['/order-confirmation'], { state: { dar: darDTO, user: this.authenticationService.currentUserValue }})
        }

      })

  }
  // Private Methods

 public dayOfMonth(dayNo){
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return days[dayNo];

  }

  _addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getDatesArr(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
  };

  _prepare(){

    this.allSlots =  [{
      name: "AnyTime",
      value: "AnyTime"
    },
  {
    name: "9AM-11AM",
    value: "9-11:AM"
    },
{
    name: "11AM-1PM",
    value: "11-1:PM"
    },
     {
    name: "2PM-4PM",
    value: "2-4:PM"
    },
    {
    name: "4PM-6PM",
    value: "4-6:PM"
    },
    {
    name: "6PM-8PM",
    value: "6-8:PM"
  }];

  this.allDates = this.getDatesArr(new Date(), this._addDays(new Date(), 10));

  }


}
