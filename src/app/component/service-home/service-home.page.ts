import { Component } from '@angular/core';
import {RestApiService}from "src/app/service/rest-api.service";
import {Router, ActivatedRoute}from '@angular/router';
import {AuthenticationService}from 'src/app/component/user-management/_services';
@Component({
  selector: 'app-service-home',
  templateUrl: 'service-home.page.html',
  styleUrls: ['service-home.page.scss']
})
export class ServiceHomePage {

  constructor(private restApiService: RestApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {}

   ngOnInit() {
      let user = this.authenticationService.currentUserValue
      debugger;
      for (let r of user.roles) {
         if(r.role === "SERVICE_PROVIDER"){
           this.router.navigate(['/track-time']);
         }
      }

  }

}
