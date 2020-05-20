import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SendPhotoPage } from '../send-photo/send-photo.page';
import {RestApiService}from "src/app/service/rest-api.service";
import {DarDTO}from "src/app/service/vo/dar.dto";
import {Router, ActivatedRoute}from '@angular/router';
import {AuthenticationService} from 'src/app/component/user-management/_services';
import {Constants} from 'src/app/shared/utils/_constants';
@Component({
  selector: 'app-track-time',
  templateUrl: './track-time.page.html',
  styleUrls: ['./track-time.page.scss'],
})
export class TrackTimePage implements OnInit {

  //readonly Constants : typeof Constants = Constants ;
  darList: DarDTO[] = [];
  constructor(
    private modalController: ModalController,
    private restApiService: RestApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {



    }

  async SendPhotoPage() {
    const modal = await this.modalController.create({
      component: SendPhotoPage,
      cssClass: 'send-photo-modal',
    });
    return await modal.present();
  }
  ngOnInit() {
    debugger;
    let loggedInuser = this.authenticationService.currentUserValue;
    if(loggedInuser) {
      let providerId = loggedInuser.id;
      this.restApiService.getServiceRequestList(providerId).subscribe(response => {
      debugger;
      for(let i = 0; i < 1; i++){

          let data = response.dars[i];
          let darDTO = new DarDTO();
          darDTO.type = data.type;
          darDTO.createdBy= data.createdByUserDTO.fullname; //@TODO: Will be added by Logged in User
          darDTO.mobilenumber= data.createdByUserDTO.mobilenumber;
          if('CREATED' === data.statusCode || 'OPEN' === data.statusCode  ){
            darDTO.status = 'Pending' ;
          }
          else {
            darDTO.status = 'Finished' ;
          }
          darDTO.darDate= data.created;
          darDTO.city = data.city;
       //   darDTO.state =  data.state.name;
          darDTO.darSlot = data.darSlot;
          darDTO.address= data.address;
          darDTO.description = data.description;
          darDTO.darCost = data.description;

          this.darList.push(darDTO);
        }
      })

    }







  }

}
